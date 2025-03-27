import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import InputForm from "../components/InputForm";

const Home = () => {
    const [result, setResult] = useState(null);

    return (
        <Container>
            <Paper sx={{ p: 3, mt: 5 }}>
                <InputForm setResult={setResult} />
                {result && (
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Prediction: {result.prediction}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Home;
