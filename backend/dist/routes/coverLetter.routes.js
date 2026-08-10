"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const coverLetter_controller_1 = require("../controllers/coverLetter.controller");
const router = (0, express_1.Router)();
router.post("/generate", auth_middleware_1.authenticate, coverLetter_controller_1.generateCoverLetterController);
exports.default = router;
//# sourceMappingURL=coverLetter.routes.js.map