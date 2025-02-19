const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Configurar CORS correctamente
app.use(cors({
    origin: "*",  // Permite solicitudes desde cualquier origen
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post("/chatbot", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error("Error en el chatbot:", error);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});

// Middleware para manejar CORS en caso de error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.listen(3000, () => console.log("Server running on port 3000"));
