const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        targetRole: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            default: "3 Months"
        },

        steps: [
            {
                month: Number,
                title: String,
                topics: [String],
                completed: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);