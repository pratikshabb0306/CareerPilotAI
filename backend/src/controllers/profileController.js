const User=require("../models/User");

const updateProfile=async(req,res,next)=>{
try{
    const{
        education,
        skills,
        experience,
        targetRole
    }=req.body;
    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }
    if (education !== undefined) {
            user.education = education;
    }
    if (skills !== undefined) {
            user.skills = skills;
    }
     if (experience !== undefined) {
            user.experience = experience;
     }

     if (targetRole !== undefined) {
            user.targetRole = targetRole;
     }
     await user.save();
     res.status(200).json({
            success: true,
            message: "Career profile updated successfully",
            profile: {
                education: user.education,
                skills: user.skills,
                experience: user.experience,
                targetRole: user.targetRole
            }
        });
}
catch (error) {
        next(error);
    }
};
module.exports={
    updateProfile
};