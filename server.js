
javascript
Copiar
Editar
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/chatbot", async (req, res) => {
    const { message } = req.body;

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

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running on port 3000"));
