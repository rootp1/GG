from flask import Flask, request, jsonify
from flask_cors import CORS
from model import load_model, predict_species, get_label_names

app = Flask(__name__)

CORS(app)


model = load_model()
label_names = get_label_names()

@app.route('/predict', methods=['GET'])
def predict():
    image_url = request.args.get('url')
    if not image_url:
        return jsonify({'error': 'URL parameter is missing'}), 400

    try:
        predicted_species = predict_species(model, image_url, label_names)
        return jsonify({'species': predicted_species})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 7860)))

