import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import jobRoutes from "./routes/job.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static Folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeAI Backend Running 🚀",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/job", jobRoutes);

export default app;