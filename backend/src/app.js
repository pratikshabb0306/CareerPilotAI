const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const resumeRoutes=require("./routes/resumeRoutes");
const aiRoutes=require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const path=require("path");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.get("/", (req, res) => {
    res.send("CareerPilotAI Backend Running 🚀");
});

module.exports = app;
