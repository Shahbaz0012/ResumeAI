import { Router } from "express";

import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";


const router = Router();


// ==========================================
// TEST
// ==========================================

router.get(
  "/test",
  (req, res) => {

    res.json({
      success: true,
      message:
        "Auth Route Working 🚀",
    });

  }
);


// ==========================================
// REGISTER
// ==========================================

router.post(
  "/register",
  register
);


// ==========================================
// LOGIN
// ==========================================

router.post(
  "/login",
  login
);


// ==========================================
// GET PROFILE
// ==========================================

router.get(
  "/profile",
  authenticate,
  getProfile
);// ==========================================
// UPDATE PROFILE
// ==========================================

router.put(
  "/profile",
  authenticate,
  updateProfile
);


// ==========================================
// EXPORT ROUTER
// ==========================================

export default router;