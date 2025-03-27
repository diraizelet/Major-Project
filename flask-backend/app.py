from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
with open('models/thyroid_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Ensure JSON format
        if 'input_data' not in data:
            return jsonify({'error': 'Missing input_data key'}), 400  # Debugging message
        
        input_data = np.array(data['input_data']).reshape(1, -1)  # Reshape for model
        
        prediction = model.predict(input_data)  # Make prediction
        return jsonify({'prediction': int(prediction[0])})  # Return response
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return errors if any

if __name__ == '__main__':
    app.run(debug=True)
