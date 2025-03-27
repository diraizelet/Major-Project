import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/predict';  // Ensure this matches your Flask backend URL

export const predictThyroid = async (formData) => {
    try {
        const response = await axios.post(API_URL, {
            input_data: formData  // Ensure Flask expects this key
        }, {
            headers: {
                'Content-Type': 'application/json'  // Ensure proper headers
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error making prediction request:', error);
        throw error;
    }
};
