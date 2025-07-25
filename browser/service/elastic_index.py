import json
import string

from elasticsearch import Elasticsearch
import math


class Index:
    def __init__(self, config):
        self.config = config
        self.client = Elasticsearch(hosts="http://host.docker.internal:9200/")
        #self.client = Elasticsearch()

    def no_case(self, str_in):
        str = str_in.strip()
        ret_str = ""
        if (str != ""):
            for char in str:
                ret_str = ret_str + "[" + char.upper() + char.lower() + "]"
        return ret_str + ".*"

    @staticmethod
    def make_matches(searchvalues):
        must_collection = []
        for item in searchvalues:
            if item["field"] == "FREE_TEXT":
                for value in item["values"]:
                    must_collection.append({"multi_match": {"query": value, "fields": ["*"]}})
            elif item["field"] == "year" or item["field"] == "birth_year" or item["field"] == "death_year":
                range_values = item["values"][0]
                r_array = range_values.split('-')
                must_collection.append({"range": {item["field"]: {"gte": r_array[0], "lte": r_array[1]}}})
            else:
                for value in item["values"]:
                    must_collection.append({"match": {item["field"] + ".keyword": value}})
        return must_collection

    def get_facet(self, field, amount, facet_filter, search_values, index):
        terms = {
            "field": field + ".keyword",
            "size": amount,
            "order": {
                "_count": "desc"
            }
        }

        if facet_filter:
            filtered_filter = facet_filter.translate(str.maketrans('', '', string.punctuation))
            filtered_filter = ''.join([f"[{char.upper()}{char.lower()}]" for char in filtered_filter])
            terms["include"] = f'.*{filtered_filter}.*'

        body = {
            "size": 0,
            "aggs": {
                "names": {
                    "terms": terms
                }
            }
        }

        if search_values:
            body["query"] = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        response = self.client.search(index=index, body=body)

        return [{"key": hits["key"], "doc_count": hits["doc_count"]}
                for hits in response["aggregations"]["names"]["buckets"]]

    def get_filter_facet(self, field, amount, facet_filter, index):
        ret_array = []
        response = self.client.search(
            index=index,
            body=
            {
                "query": {
                    "regexp": {
                        field: self.no_case(facet_filter)
                    }
                },
                "size": 0,
                "aggs": {
                    "names": {
                        "terms": {
                            "field": field,
                            "size": 20,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    }
                }
            }
        )
        for hits in response["aggregations"]["names"]["buckets"]:
            buffer = {"key": hits["key"], "doc_count": hits["doc_count"]}
            if facet_filter.lower() in buffer["key"].lower():
                ret_array.append(buffer)
        return ret_array

    def get_nested_facet(self, field, amount, facet_filter):
        ret_array = []
        path = field.split('.')[0]
        response = self.client.search(
            index="sport",
            body=
            {"size": 0, "aggs": {"nested_terms": {"nested": {"path": path}, "aggs": {
                "filter": {"filter": {"regexp": {"$field.raw": "$filter.*"}},
                           "aggs": {"names": {"terms": {"field": "$field.raw", "size": amount}}}}}}}}
        )
        for hits in response["aggregations"]["nested_terms"]["filter"]["names"]["buckets"]:
            buffer = {"key": hits["key"], "doc_count": hits["doc_count"]}
            ret_array.append(buffer)
        return ret_array

    def browse_institutions(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-institution", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["institution_id", "name", "authorisedForm", "history", "country"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })

        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}

    def browse_collections(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-collection", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["collection_id", "name", "authorisedForm", "scope", "level", "type", "institution"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })

        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}

    def browse_persons(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-person", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["person_id", "name", "authorisedForm", "history"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })

        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}

    def browse_groups(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-group", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["group_id", "name", "authorisedForm", "history", "type"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })

        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}

    def browse_places(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-place", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["place_id", "name", "authorisedForm", "descr"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })

        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}

    def browse_events(self, page, length, search_values):
        int_page = int(page)
        start = (int_page - 1) * length

        if search_values:
            query = {
                "bool": {
                    "must": self.make_matches(search_values)
                }
            }
        else:
            query = {
                "match_all": {}
            }

        response = self.client.search(index="niod-yugo-event", body={
            "query": query,
            "size": length,
            "from": start,
            "_source": ["event_id", "name", "authorisedForm", "history", "type"],
            "sort": [
                {"authorisedForm.keyword": {"order": "asc"}}
            ]
        })
        return {"amount": response["hits"]["total"]["value"],
                "pages": math.ceil(response["hits"]["total"]["value"] / length),
                "items": [item["_source"] for item in response["hits"]["hits"]]}
