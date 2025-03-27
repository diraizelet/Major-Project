import React, { useState } from "react";
import { Box, TextField, Button, Typography, Dialog, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const toggleChat = () => setOpen(!open);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userMessage = { role: "user", content: userInput };
        const updatedHistory = [...chatHistory, userMessage];

        setChatHistory(updatedHistory);
        setUserInput("");

        try {
            console.log("Sending request to API...");

            const response = await axios.post(
                apiUrl,
                {
                    contents: [
                        {
                            parts: [{ text: userInput }]
                        }
                    ]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log("API Response:", response.data);

            const botMessageContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            const botMessage = {
                role: "bot",
                content: botMessageContent || "I'm not sure about that."
            };

            setChatHistory([...updatedHistory, botMessage]);
        } catch (error) {
            console.error("Error fetching response:", error.response?.data || error.message);
            setChatHistory([...updatedHistory, { role: "bot", content: "Error fetching response. Please try again." }]);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <IconButton 
                onClick={toggleChat} 
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#1976d2",
                    color: "white",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    boxShadow: 3,
                    "&:hover": { backgroundColor: "#135ba1" }
                }}
            >
                <ChatIcon fontSize="large" />
            </IconButton>

            {/* Chat Dialog Box */}
            <Dialog open={open} onClose={toggleChat} fullWidth maxWidth="sm">
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: 400 }}>
                    {/* Chat Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h6">Chat with AI</Typography>
                        <IconButton onClick={toggleChat}><CloseIcon /></IconButton>
                    </Box>

                    {/* Chat History */}
                    <Box sx={{ flex: 1, overflowY: "auto", p: 1, border: "1px solid #ddd", borderRadius: 1, maxHeight: 300 }}>
                        {chatHistory.map((msg, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: msg.role === "user" ? "right" : "left",
                                    color: msg.role === "user" ? "blue" : "green",
                                    backgroundColor: msg.role === "user" ? "#e3f2fd" : "#e8f5e9",
                                    borderRadius: 1,
                                    p: 1,
                                    m: 0.5,
                                    maxWidth: "75%",
                                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start"
                                }}
                            >
                                {msg.content}
                            </Typography>
                        ))}
                    </Box>

                    {/* Chat Input */}
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        value={userInput} 
                        onChange={(e) => setUserInput(e.target.value)} 
                        placeholder="Type a message..." 
                        sx={{ mt: 1 }}
                    />
                    <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleSend}>
                        Send
                    </Button>
                </Box>
            </Dialog>
        </>
    );
};

export default Chatbot;
