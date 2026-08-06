import { Router } from "express";
import {
  uploadResume,
  getResumeAnalysis,
  getResumeHistory,
} from "../controllers/resume.controller";
import upload from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/history",
  authenticate,
  getResumeHistory
);

router.get(
  "/:id",
  authenticate,
  getResumeAnalysis
);

export default router;