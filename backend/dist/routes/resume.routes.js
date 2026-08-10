"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resume_controller_1 = require("../controllers/resume.controller");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/upload", auth_middleware_1.authenticate, upload_middleware_1.default.single("resume"), resume_controller_1.uploadResume);
router.get("/history", auth_middleware_1.authenticate, resume_controller_1.getResumeHistory);
router.get("/:id", auth_middleware_1.authenticate, resume_controller_1.getResumeAnalysis);
router.delete("/:id", auth_middleware_1.authenticate, resume_controller_1.deleteResume);
exports.default = router;
//# sourceMappingURL=resume.routes.js.map