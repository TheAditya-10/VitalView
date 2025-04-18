from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

@app.route('/')
def home():
    return "Welcome to the Flask App!"

@app.route('/healthinfo', methods=['GET'])
def send_health_info():
    health_info = {
        "bmi": "22.5",
        "status": "Normal weight",
        "advice": "Maintain a balanced diet and regular exercise."
    }
    return jsonify(health_info)

if __name__ == '__main__':
    app.run(debug=True)