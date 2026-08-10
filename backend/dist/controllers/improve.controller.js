"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.improveResumeController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const improve_service_1 = require("../services/improve.service");
const document_service_1 = require("../services/document.service");
const improveResumeController = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { resumeId } = req.body;
        if (!resumeId) {
            return res.status(400).json({
                success: false,
                message: "Resume ID is required.",
            });
        }
        const resume = await prisma_1.default.resume.findFirst({
            where: {
                id: resumeId,
                userId: req.userId,
            },
        });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }
        if (!resume.resumeText) {
            return res.status(400).json({
                success: false,
                message: "Resume text not found. Please upload the resume again.",
            });
        }
        const result = await (0, improve_service_1.improveResume)(resume.resumeText);
        const improvementContent = JSON.stringify({
            professionalSummary: result.professionalSummary,
            improvedSkills: result.improvedSkills,
            experienceRewrite: result.experienceRewrite,
            projectSuggestions: result.projectSuggestions,
            atsKeywords: result.atsKeywords,
            finalTips: result.finalTips,
        });
        const document = await (0, document_service_1.saveGeneratedDocument)({
            userId: req.userId,
            resumeId: resume.id,
            type: "RESUME_IMPROVEMENT",
            title: `Resume Improvement - ${resume.title}`,
            content: improvementContent,
        });
        return res.status(200).json({
            success: true,
            resume: {
                id: resume.id,
                title: resume.title,
                atsScore: resume.atsScore,
            },
            document: {
                id: document.id,
                type: document.type,
                title: document.title,
                createdAt: document.createdAt,
            },
            improvement: {
                professionalSummary: result.professionalSummary,
                improvedSkills: result.improvedSkills,
                experienceRewrite: result.experienceRewrite,
                projectSuggestions: result.projectSuggestions,
                atsKeywords: result.atsKeywords,
                finalTips: result.finalTips,
            },
        });
    }
    catch (error) {
        console.error("========== RESUME IMPROVEMENT ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.improveResumeController = improveResumeController;
//# sourceMappingURL=improve.controller.js.map