# install required packages
# pip install flask elasticsearch

from flask import Flask, request
from elasticsearch import Elasticsearch

app = Flask(__name__)
es = Elasticsearch('http://localhost:9200')

from flask import send_from_directory

@app.route('/favicon.ico')
def favicon():
    return {'Nothing'}

@app.route('/', methods=['GET'])
def home():
    return {'status': 'success', 'message': 'Home route'}

@app.route('/ingest', methods=['POST'])
def ingest():
    try:
        log_data = request.get_json()
        es.index(index='logs', body=log_data)
        return {'status': 'success'}
    except Exception as e:
        return {'status': 'error', 'error': str(e)}

if __name__ == '__main__':
    app.run(port=3000)
