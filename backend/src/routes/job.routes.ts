import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import { matchJobDescription } from "../controllers/job.controller";

const router = Router();

router.post(
  "/match",
  authenticate,
  matchJobDescription
);

export default router;