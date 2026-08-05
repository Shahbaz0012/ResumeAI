import { Router } from "express";
import {
  register,
  login,
} from "../controllers/auth.controller";

import {
  authenticate,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working 🚀",
  });
});

router.post("/register", register);

router.post("/login", login);

router.get(
  "/profile",
  authenticate,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      userId: req.userId,
    });
  }
);

export default router;