"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const job_controller_1 = require("../controllers/job.controller");
const router = (0, express_1.Router)();
router.post("/match", auth_middleware_1.authenticate, job_controller_1.matchJobDescription);
exports.default = router;
//# sourceMappingURL=job.routes.js.map