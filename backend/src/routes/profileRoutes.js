const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {
    updateProfile
} = require("../controllers/profileController");

router.put(
    "/",
    authenticate,
    updateProfile
);

module.exports = router;