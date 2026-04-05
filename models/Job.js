const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["MTN", "Telecel", "Other"],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    fiberNo: {
        type: String,
        required: true
    },
    sn: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);