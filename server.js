const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Contact Form Route
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        res.status(201).json({ success: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error, try again later" });
    }
});

// Serve Frontend Build Files
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
