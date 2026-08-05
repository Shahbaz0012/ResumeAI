import { Router } from "express";
import { uploadResume } from "../controllers/resume.controller";
import upload from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  uploadResume
);

export default router;