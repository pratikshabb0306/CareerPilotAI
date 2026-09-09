const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        analysis: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const AIAnalysis = mongoose.model(
    "AIAnalysis",
    aiAnalysisSchema
);

module.exports = AIAnalysis;