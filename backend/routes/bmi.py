from flask import Flask, jsonify

app = Flask(__name__)

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