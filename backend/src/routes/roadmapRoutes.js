const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    generateRoadmap,
    getMyRoadmap
} = require("../controllers/roadmapController");

router.post(
    "/generate",
    authenticate,
    generateRoadmap
);

router.get(
    "/",
    authenticate,
    getMyRoadmap
);

module.exports = router;