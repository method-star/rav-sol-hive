const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
module.exports = router;

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }

        // 🔐 HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json("User registered successfully ✅");

    } catch (err) {
        res.status(500).json(err.message);
    }
});


// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        // check password
      const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(400).json("Wrong password");
}

       const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

res.status(200).json({
    message: "Login successful ✅",
    token,
    user
});

    } catch (err) {
        res.status(500).json(err.message);
    }
});