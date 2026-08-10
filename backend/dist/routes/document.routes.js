"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const document_controller_1 = require("../controllers/document.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, document_controller_1.createDocument);
router.get("/", auth_middleware_1.authenticate, document_controller_1.getDocuments);
router.delete("/:id", auth_middleware_1.authenticate, document_controller_1.deleteDocument);
exports.default = router;
//# sourceMappingURL=document.routes.js.map