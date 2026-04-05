
require("dotenv").config(); // MUST BE FIRST

const jobRoutes = require("./routes/job");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const verifyToken = require("./middleware/auth");
app.get("/api/dashboard", verifyToken, (req, res) => {
    res.json("Welcome to your dashboard 🔐");
});

app.use(cors());
app.use(express.json());

app.use("/api/job", jobRoutes);

app.use(express.static(path.join(__dirname, "frontend")));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log("MongoDB Error ❌", err);
});

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
console.log("MONGO_URI:", process.env.MONGO_URI);
