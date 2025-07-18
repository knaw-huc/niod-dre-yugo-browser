# -*- coding: utf-8 -*-
import argparse
from datetime import datetime
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import glob
import jmespath
import json
import locale
#locale.setlocale(locale.LC_ALL, 'nl_NL')
from rdflib import Graph
import sys
from saxonche import PySaxonProcessor
import tomllib


class Indexer:
    es: Elasticsearch = None
    config: dict
    index_name: str

    def __init__(self, es: Elasticsearch, config: dict, index_name: str):
        self.es = es
        self.config = config
        self.index_name = index_name

    def parse_json(self, infile: dict) -> dict:
        """
        Process an input JSON file according to config and return resulting dict.
        :param infile:
        :return:
        """
        path_id = self.config['index']['id']['path']
        doc_id = resolve_path(infile, path_id)
        doc = {'id': doc_id}
        for key in self.config['index']['facet'].keys():
            facet = self.config["index"]["facet"][key]
            path_facet = facet["path"]
            doc[key] = resolve_path(infile, path_facet)
        return doc

    def parse_xml(self, infile: str) -> dict:
        """
        Process an input XML file according to config and return resulting dict.
        :param infile:
        :return:
        """
        '''
        when = xpproc.evaluate_single("string((/*:CMD/*:Header/*:MdCreationDate/@clariah:epoch,/*:CMD/*:Header/*:MdCreationDate,'unknown')[1])").get_string_value()
        '''
        with PySaxonProcessor(license=False) as proc:
            doc = None
            xpproc = proc.new_xpath_processor()
            node = proc.parse_xml(xml_text=infile)
            xpproc.set_context(xdm_item=node)
            for key in self.config['index']['input']['ns'].keys():
                xpproc.declare_namespace(key,self.config['index']['input']['ns'][key])
            do = True
            if 'when' in self.config['index']['input'].keys():
                do = xpproc.effective_boolean_value(f"{self.config['index']['input']['when']}")
            if do:
                path_id = self.config['index']['id']['path']
                doc_id = xpproc.evaluate_single(f"{path_id}").get_string_value() 
                doc = {'id': doc_id}
                xpproc.declare_variable('id')
                xpproc.set_parameter('id',proc.make_string_value(doc_id))
                if self.config["index"]["full_text"]=="yes":
                    val = xpproc.evaluate_single("string-join(//cmd:Components//text()/normalize-space()[.!=''],' ')")
                    if val:
                        doc["full_text"] = val.get_string_value()
                for key in self.config['index']['facet'].keys():
                    facet = self.config["index"]["facet"][key]
                    print(f"FACET[{key}]")
                    path_facet = facet["path"]
                    cardinality="list"
                    if ('cardinality' in facet.keys()):
                        cardinality = facet['cardinality']
                    if cardinality == 'single':
                        val = xpproc.evaluate_single(f"{path_facet}")
                        if val:
                            val = val.get_string_value()
                            if val.strip() != '':
                                doc[key] = val
                    else:
                        res = []
                        items = xpproc.evaluate(f"{path_facet}")
                        if items:
                            for item in xpproc.evaluate(f"{path_facet}"):
                                val = item.get_string_value()
                                if val.strip() != '':
                                    res.append(val)
                            doc[key] = res
            return doc

    def parse_sparql(self, infile: str) -> dict:
        """
        Process an input SPARQL file according to config and return resulting dict.
        :param infile:
        :return:
        """
        g = Graph()
        g.parse(data=infile, format="turtle")
        path_id = self.config['index']['id']['path']
        path_id = g.query(path_id)
        doc = { 'id': path_id }
        for key in self.config['index']['facet'].keys():
            qres = g.query(self.config["index"]["facet"][key]['path'])
            for row in qres:
                try:
                    doc['key'] = row.key
                except:
                    pass
        return doc

    def create_mapping(self, overwrite: bool = False) -> dict:
        """
        Create the elasticsearch index mapping according to config and return resulting dict.
        :return:
        """
        if overwrite:
            self.es.indices.delete(index=self.index_name, ignore=[400, 404])

        properties = {}
        for facet_name in self.config['index']['facet'].keys():
            if self.config["index"]["full_text"]=="yes":
                properties["full_text"] = {
                    'type': 'text',
                    'fields': {
                        'keyword': {
                            'type': 'keyword'
                        },
                    }
                }
            facet = self.config["index"]["facet"][facet_name]
            type = facet.get('type', 'text')
            if type == 'text':
                properties[facet_name] = {
                    'type': 'text',
                    'fields': {
                        'keyword': {
                            'type': 'keyword',
                            'ignore_above': 256
                        },
                    }
                }
            elif type == 'keyword':
                properties[facet_name] = {
                    'type': 'keyword',
                }
            elif type == 'number':
                properties[facet_name] = {
                    'type': 'integer',
                }
            elif type == 'date':
                properties[facet_name] = {
                    'type': 'date',
                }

        mappings = {
            'properties': properties
        }

        settings = {
            'number_of_shards': 2,
            'number_of_replicas': 0
        }

        # misschien aanpassen naar create_if_not_exists
        self.es.indices.create(index=self.index_name, mappings=mappings, settings=settings)
        return mappings


    def import_files(self, files: list[str]):
        """
        Import files into an elasticsearch index based on the given config.
        :param files: list of files to import
        :param index: Elasticsearch index
        :return:
        """
        #es = Elasticsearch()
        actions = []
        self.extension = self.config['index']['input']['format']
        for inv in files:
            print(f"RECORD[{inv}]")
            doc = {}
            with open(inv) as f:
                if self.extension=='json':
                    d = json.load(f)
                    # add to index list
                    doc = self.parse_json(d)
                elif self.extension=='xml':
                    d = f.read()                   
                    doc = self.parse_xml(d)
                elif self.extension=='ttl':
                    d = f.read()                   
                    doc = self.parse_sparql(d)
                else:
                # check if doc exists?
                # just in case someone tries to index something else than json or xml?
                    stderr(f'we don\'t do {extension} yet.')
                    end_prog(1)
                if doc:
                    actions.append({'_index': self.index_name, '_id': doc['id'], '_source': doc})
        # add to index:
        print(json.dumps(actions))
        bulk(self.es, actions)


def resolve_path(rec, path):
    if path.startswith("jmes:"):
        # for jmes: 5:
        return jmespath.search(path[5:], rec)


def stderr(text):
    sys.stderr.write("{}\n".format(text))


def end_prog(code=0):
    if code != 0:
        stderr(f'afgebroken met code: {code}')
    stderr(datetime.today().strftime("einde: %H:%M:%S"))
    sys.exit(code)


def arguments():
    ap = argparse.ArgumentParser(description='Read json and feed to ElasticSearch')
    ap.add_argument('-d', '--directory',
                    help="input directory")
    ap.add_argument('-t', '--tomlfile',
                    default='ineo.toml',
                    help="toml file")
    ap.add_argument('-f', '--inputfile',
                    help="input file")
    ap.add_argument('-i', '--index', default='test-index')
    ap.add_argument('--force', action='store_true')
    args = vars(ap.parse_args())
    return args, ap


def main():
    stderr(datetime.today().strftime("start: %H:%M:%S"))
    args, ap = arguments()
    toml_file = args['tomlfile']
    with open(toml_file, "rb") as f:
        config = tomllib.load(f)

    input_dir = args['directory']
    extension = config['index']['input']['format']
    stderr(f'extension: {extension}')
    input_list = glob.glob(f'{input_dir}/*.{extension}')
    if len(input_list) == 0:
        input_file = args['inputfile']
        if input_file is None:
            stderr(ap.print_help())
            end_prog(1)
        input_list = [args['input_file']]

    index = args['index']    
    if 'name' in config['index']:
        index = config['index']['name']

    host="http://localhost:9200/"
    if 'host' in config['index']:
        host = config['index']['host']

    indexer = Indexer(Elasticsearch(hosts=host), config, index)

    indexer.create_mapping(overwrite=args['force'])
    indexer.import_files(input_list)

    end_prog(0)


if __name__ == "__main__":
    main()
