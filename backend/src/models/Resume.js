const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },

        filepath: {
            type: String,
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;