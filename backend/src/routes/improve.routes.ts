import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { improveResumeController } from "../controllers/improve.controller";

const router = Router();

router.post(
  "/resume",
  authenticate,
  improveResumeController
);

export default router;