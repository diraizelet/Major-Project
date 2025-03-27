import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import Chatbot from "../components/Chatbot";

// Define class labels
const CLASS_NAMES = [
    "Negative", 
    "Compensated Hypothyroid", 
    "Primary Hypothyroid", 
    "Secondary Hypothyroid"
];

// Dummy data for thyroid conditions (medicine, causes)
const THYROID_INFO = {
    "Compensated Hypothyroid": {
        medicines: ["Levothyroxine", "Liothyronine"],
        causes: ["Iodine deficiency", "Autoimmune thyroiditis"],
        description: "Occurs when the thyroid is underactive, but the pituitary gland compensates by increasing TSH levels."
    },
    "Primary Hypothyroid": {
        medicines: ["Levothyroxine"],
        causes: ["Hashimoto's thyroiditis", "Surgical removal of thyroid", "Radiation therapy"],
        description: "Results from direct thyroid dysfunction, leading to insufficient thyroid hormone production."
    },
    "Secondary Hypothyroid": {
        medicines: ["Thyroid hormone replacement"],
        causes: ["Pituitary gland disorder", "Hypothalamic disease"],
        description: "Occurs due to issues in the pituitary or hypothalamus, preventing stimulation of the thyroid."
    }
};

const ResultPage = ({ result }) => {
    const navigate = useNavigate();
    const predictionLabel = result !== null ? CLASS_NAMES[result.prediction] : null;
    
    // Get thyroid condition details
    const thyroidDetails = predictionLabel && THYROID_INFO[predictionLabel];

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography variant="h4" gutterBottom>Prediction Result</Typography>
            {predictionLabel ? (
                <>
                    <Typography variant="h5" color="primary">
                        {`The model predicts: ${predictionLabel}`}
                    </Typography>
                    {thyroidDetails && (
                        <>
                            <Typography variant="h6" color="secondary" style={{ marginTop: "20px" }}>
                                Recommended Medicines: {thyroidDetails.medicines.join(", ")}
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: "10px" }}>
                                Possible Causes: {thyroidDetails.causes.join(", ")}
                            </Typography>
                            <Typography variant="body2" style={{ marginTop: "10px", fontStyle: "italic" }}>
                                {thyroidDetails.description}
                            </Typography>
                        </>
                    )}
                </>
            ) : (
                <Typography variant="h6" color="error">No prediction available.</Typography>
            )}
            
            <Button 
                variant="contained" 
                color="secondary" 
                style={{ marginTop: 20 }} 
                onClick={() => navigate("/")}
            >
                Back to Form
            </Button>

            {/* Pass prediction details to Chatbot */}
            {predictionLabel && (
                <Chatbot 
                    prediction={predictionLabel} 
                    medicines={thyroidDetails?.medicines || []}
                    causes={thyroidDetails?.causes || []}
                    description={thyroidDetails?.description || ""}
                />
            )}
        </Container>
    );
};

export default ResultPage;
