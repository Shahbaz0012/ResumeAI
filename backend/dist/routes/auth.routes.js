"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// ==========================================
// TEST
// ==========================================
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working 🚀",
    });
});
// ==========================================
// REGISTER
// ==========================================
router.post("/register", auth_controller_1.register);
// ==========================================
// LOGIN
// ==========================================
router.post("/login", auth_controller_1.login);
// ==========================================
// GET PROFILE
// ==========================================
router.get("/profile", auth_middleware_1.authenticate, auth_controller_1.getProfile); // ==========================================
// UPDATE PROFILE
// ==========================================
router.put("/profile", auth_middleware_1.authenticate, auth_controller_1.updateProfile);
// ==========================================
// EXPORT ROUTER
// ==========================================
exports.default = router;
//# sourceMappingURL=auth.routes.js.map