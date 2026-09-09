const User = require("../models/User");
const AIAnalysis = require("../models/AIAnalysis");

const {
    analyzeCareerProfile
} = require("../services/geminiService");


const analyzeCareer = async (req, res, next) => {

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

        // Generate AI analysis
        const analysis = await analyzeCareerProfile({
            education: user.education,
            skills: user.skills,
            experience: user.experience,
            targetRole: user.targetRole
        });

        // Save analysis in MongoDB
        const savedAnalysis = await AIAnalysis.create({
            userId: user._id,
            analysis: analysis
        });

        res.status(200).json({
            success: true,
            message: "Career analysis generated successfully",

            analysis: savedAnalysis
        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    analyzeCareer
};