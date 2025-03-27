import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { predictThyroid } from "../services/api";

const InputForm = ({ setResult }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        sex: 0,
        on_thyroxine: 0,
        query_on_thyroxine: 0,
        on_antithyroid_medication: 0,
        sick: 0,
        pregnant: 0,
        thyroid_surgery: 0,
        I131_treatment: 0,
        query_hypothyroid: 0,
        query_hyperthyroid: 0,
        lithium: 0,
        goitre: 0,
        tumor: 0,
        hypopituitary: 0,
        psych: 0,
        T3: "",
        TT4: "",
        T4U: "",
        FTI: "",
        referral_source_SVHC: 0,
        referral_source_SVHD: 0,
        referral_source_SVI: 0,
        referral_source_other: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputArray = Object.values(formData).map(Number);
        try {
            const result = await predictThyroid(inputArray);
            setResult(result);
            navigate("/result"); // Navigate to the result page
        } catch (error) {
            console.error("Prediction Error:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>Thyroid Prediction</Typography>
            
            <TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth margin="normal" type="number" />
            
            <TextField select label="Sex" name="sex" value={formData.sex} onChange={handleChange} fullWidth margin="normal">
                <MenuItem value={0}>Female</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
            </TextField>

            {[ "on_thyroxine", "query_on_thyroxine", "on_antithyroid_medication", "sick", "pregnant",
               "thyroid_surgery", "I131_treatment", "query_hypothyroid", "query_hyperthyroid",
               "lithium", "goitre", "tumor", "hypopituitary", "psych",
               "referral_source_SVHC", "referral_source_SVHD", "referral_source_SVI", "referral_source_other"
            ].map((field) => (
                <TextField key={field} select label={field.replace(/_/g, " ")} name={field} value={formData[field]} onChange={handleChange} fullWidth margin="normal">
                    <MenuItem value={0}>No</MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                </TextField>
            ))}

            {["T3", "TT4", "T4U", "FTI"].map((field) => (
                <TextField key={field} label={field} name={field} value={formData[field]} onChange={handleChange} fullWidth margin="normal" type="number" />
            ))}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Predict</Button>
        </Box>
    );
};

export default InputForm;
