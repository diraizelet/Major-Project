import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./components/InputForm";
import ResultPage from "./pages/ResultPage";

function App() {
    const [result, setResult] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<InputForm setResult={setResult} />} />
                <Route path="/result" element={<ResultPage result={result} />} />
            </Routes>
        </Router>
    );
}

export default App;
