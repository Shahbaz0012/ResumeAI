"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const resume_routes_1 = __importDefault(require("./routes/resume.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const improve_routes_1 = __importDefault(require("./routes/improve.routes"));
const coverLetter_routes_1 = __importDefault(require("./routes/coverLetter.routes"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Static Folder
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ResumeAI Backend Running 🚀",
        version: "1.0.0",
    });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/resume", resume_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/job", job_routes_1.default);
app.use("/api/improve", improve_routes_1.default);
app.use("/api/cover-letter", coverLetter_routes_1.default);
app.use("/api/documents", document_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map