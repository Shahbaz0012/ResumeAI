import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeAI Backend Running 🚀",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

export default app;