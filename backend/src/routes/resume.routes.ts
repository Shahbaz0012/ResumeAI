import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadResume } from "../controllers/resume.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("resume"),
  uploadResume
);

export default router;