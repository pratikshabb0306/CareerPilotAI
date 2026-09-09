const Resume =require("../models/Resume");
const fs = require("fs");
const path = require("path");

const uploadResume=async(req,res,next)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Please upload a resume"
            });
        }
        const resume= await Resume.create({
            filename:req.file.filename,
            filepath:req.file.path,
            userId:req.user.id
        });
        res.status(201).json({
            success:true,
            message:"Resume uploaded successfully", 
            resume
        });

    } 
    catch(error){
        next(error);

    }
};
const getResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            resume
        });

    } catch (error) {
        next(error);
    }
};
const deleteResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({
            where: {
                userId: req.user.id
            },
            order: [["createdAt", "DESC"]]
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const filePath = path.resolve(resume.filepath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await resume.destroy();

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
module.exports={uploadResume,getResume,deleteResume};