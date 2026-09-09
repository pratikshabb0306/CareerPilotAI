const User = require("../models/User");
const Roadmap = require("../models/Roadmap");

const {
    generateCareerRoadmap
} = require("../services/geminiService");


const generateRoadmap = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.targetRole) {
            return res.status(400).json({
                message: "Please complete your career profile first"
            });
        }

        // Generate roadmap using Gemini
        const roadmapData = await generateCareerRoadmap({
            education: user.education,
            skills: user.skills,
            experience: user.experience,
            targetRole: user.targetRole
        });

        // Save roadmap in MongoDB
        const roadmap = await Roadmap.create({
            userId: user._id,
            title: roadmapData.title,
            targetRole: roadmapData.targetRole,
            duration: roadmapData.duration,
            steps: roadmapData.steps
        });

        res.status(201).json({
            success: true,
            message: "AI career roadmap generated successfully",
            roadmap
        });

    } catch (error) {
        next(error);
    }
};


const getMyRoadmap = async (req, res, next) => {

    try {

        const roadmap = await Roadmap.findOne({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        if (!roadmap) {
            return res.status(404).json({
                message: "No roadmap found"
            });
        }

        res.status(200).json({
            success: true,
            roadmap
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    generateRoadmap,
    getMyRoadmap
};