const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        education: {
            type: String,
            default: ""
        },
        skills: {
            type: [String],
            default: []
        },
        experience: {
            type: String,
            default: ""
        },
        targetRole: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;