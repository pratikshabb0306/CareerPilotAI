const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume,
    getResume,
    deleteResume
} = require("../controllers/resumeController");


router.post(
    "/upload",
    authenticate,
    upload.single("resume"),
    uploadResume
);


router.get(
    "/my-resume",
    authenticate,
    getResume
);


router.delete(
    "/delete",
    authenticate,
    deleteResume
);


module.exports = router;