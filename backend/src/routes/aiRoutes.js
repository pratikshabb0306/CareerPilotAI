const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    analyzeCareer
} = require("../controllers/aiController");


router.get(
    "/analyze",
    authenticate,
    analyzeCareer
);


module.exports = router;