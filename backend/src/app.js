require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const path = require("path");

const app = express();

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// MongoDB connection middleware
// --------------------------------------------------
// Every request waits for MongoDB before reaching
// controllers that use Mongoose.
//
// The connection helper caches the connection/promise,
// so we do NOT create a new connection for every request.
// --------------------------------------------------

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(503).json({
            message: "Database connection failed",
            error: error.message,
        });
    }
});

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);

// --------------------------------------------------
// Static files
// --------------------------------------------------

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------------------------------------
// Root route
// --------------------------------------------------

app.get("/", (req, res) => {
    res.send("CareerPilotAI Backend Running 🚀");
});

// --------------------------------------------------
// Error handler
// --------------------------------------------------

app.use(errorHandler);

module.exports = app;
