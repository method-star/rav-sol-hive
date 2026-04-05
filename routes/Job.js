const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const verifyToken = require("../middleware/auth");

// ADD JOB
router.post("/add", verifyToken, async (req, res) => {
    try {
        const { category, date, customerName, fiberNo, sn } = req.body;

        const newJob = new Job({
            category,
            date,
            customerName,
            fiberNo,
            sn,
            userId: req.user.id
        });

        await newJob.save();

        res.status(201).json("Job added successfully ✅");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// GET ALL JOBS (for logged-in user)
router.get("/all", verifyToken, async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// DELETE JOB
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json("Job deleted ✅");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// UPDATE JOB
router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json("Job updated ✅");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;