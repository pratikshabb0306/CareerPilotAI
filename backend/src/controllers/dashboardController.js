const User = require("../models/User");
const Resume = require("../models/Resume");

const getDashboard = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resumeCount = await Resume.countDocuments({
            userId: req.user.id
        });

        res.status(200).json({
            success: true,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },

            resumeCount,

            message: "Welcome to CareerPilotAI"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard
};
