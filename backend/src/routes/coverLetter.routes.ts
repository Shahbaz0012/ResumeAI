import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  generateCoverLetterController,
} from "../controllers/coverLetter.controller";

const router = Router();

router.post(
  "/generate",
  authenticate,
  generateCoverLetterController
);

export default router;