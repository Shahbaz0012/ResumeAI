"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const improve_controller_1 = require("../controllers/improve.controller");
const router = (0, express_1.Router)();
router.post("/resume", auth_middleware_1.authenticate, improve_controller_1.improveResumeController);
exports.default = router;
//# sourceMappingURL=improve.routes.js.map