from flask import Flask, request, jsonify
from flask_cors import CORS
from elastic_index import Index
from saxonche import PySaxonProcessor
import os
import requests as req

app = Flask(__name__, static_folder='browser', static_url_path='')

CORS(app)

config = {
    "editor" : os.getenv("CCF_URI", "http://host.docker.internal:1211"),
    "token": os.getenv("CCF_API_TOKEN", "foobar")
}

index = Index(config)

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    return response

@app.route('/', methods=['GET', 'POST'])
@app.route('/about')
@app.route('/institutions')
@app.route('/collections')
@app.route('/persons')
@app.route('/groups')
@app.route('/places')
@app.route('/events')
def catch_all():
    return app.send_static_file("index.html")

@app.route('/institution_detail/<id>')
@app.route('/collection_detail/<id>')
@app.route('/person_detail/<id>')
@app.route('/group_detail/<id>')
@app.route('/place_detail/<id>')
@app.route('/event_detail/<id>')
def detail(id):
    return app.send_static_file("index.html")

@app.route("/institution_facet", methods=['POST', 'GET'])
def get_institution_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-institution")
    return jsonify(ret_struc)

@app.route("/collection_facet", methods=['POST', 'GET'])
def get_collection_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-collection")
    return jsonify(ret_struc)

@app.route("/person_facet", methods=['POST', 'GET'])
def get_personfacet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-person")
    return jsonify(ret_struc)

@app.route("/group_facet", methods=['POST', 'GET'])
def get_group_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-group")
    return jsonify(ret_struc)

@app.route("/place_facet", methods=['POST', 'GET'])
def get_place_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-place")
    return jsonify(ret_struc)

@app.route("/event_facet", methods=['POST', 'GET'])
def get_event_facet():
    struc = request.get_json()
    ret_struc = index.get_facet(struc["name"], struc["amount"], struc["filter"], struc["searchvalues"], "niod-yugo-event")
    return jsonify(ret_struc)

@app.route("/browse_institution",  methods=['POST', 'GET'])
def browse_institutions():
    struc = request.get_json()
    ret_struc = index.browse_institutions(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_collection",  methods=['POST', 'GET'])
def browse_collections():
    struc = request.get_json()
    ret_struc = index.browse_collections(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_person",  methods=['POST', 'GET'])
def browse_persons():
    struc = request.get_json()
    ret_struc = index.browse_persons(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_group",  methods=['POST', 'GET'])
def browse_groups():
    struc = request.get_json()
    ret_struc = index.browse_groups(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_place",  methods=['POST', 'GET'])
def browse_places():
    struc = request.get_json()
    ret_struc = index.browse_places(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/browse_event",  methods=['POST', 'GET'])
def browse_events():
    struc = request.get_json()
    ret_struc = index.browse_events(struc["page"], struc["page_length"], struc["searchvalues"])
    return jsonify(ret_struc)

@app.route("/get_institution_detail/<id>", methods=['GET'])
def get_institution_detail(id):
    ret_struc = get_record('institution','clarin.eu:cr1:p_1721373443934',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

@app.route("/get_collection_detail/<id>", methods=['GET'])
def get_collection_detail(id):
    ret_struc = get_record('collection','clarin.eu:cr1:p_1747312582429',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

@app.route("/get_person_detail/<id>", methods=['GET'])
def get_person_detail(id):
    ret_struc = get_record('person','clarin.eu:cr1:p_1721373443955',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

@app.route("/get_group_detail/<id>", methods=['GET'])
def get_group_detail(id):
    ret_struc = get_record('group','clarin.eu:cr1:p_1747312582450',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

@app.route("/get_place_detail/<id>", methods=['GET'])
def get_place_detail(id):
    ret_struc = get_record('place','clarin.eu:cr1:p_1744616237113',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

@app.route("/get_event_detail/<id>", methods=['GET'])
def get_event_detail(id):
    ret_struc = get_record('event','clarin.eu:cr1:p_1733830015132',id,"string((//cmdp:authorisedForm[@xml:lang='en'],//cmdp:authorisedForm)[1])")
    return jsonify(ret_struc)

def get_record(ent,prof,id,title_path):
    status="OK"
    url=f"{config['editor']}/app/yugo/profile/{prof}/record/{id}/action/browser"
    res = req.get(url, headers={"Authorization": f"Bearer {config['token']}"})
    html=""
    title="unknown"
    if res.status_code==200:
        html = res.content.decode()
        url = f"{config['editor']}/app/yugo/profile/{prof}/record/{id}.xml"
        xml = req.get(url, headers={"Authorization": f"Bearer {config['token']}"}).content.decode()
        with PySaxonProcessor(license=False) as proc:
            xpproc = proc.new_xpath_processor()
            node = proc.parse_xml(xml_text=xml)
            xpproc.set_context(xdm_item=node)
            xpproc.declare_namespace("cmd","http://www.clarin.eu/cmd/1")
            xpproc.declare_namespace("cmdp",f"http://www.clarin.eu/cmd/1/profiles/{prof}")
            title = xpproc.evaluate_single(title_path).get_string_value()
    else:
        status="NOT_OK"
    detail = {f"{ent}_id":id,'title':title,'html':html}
    return {'status':status, 'detail':detail}

#Start main program

if __name__ == '__main__':
    app.run()

