"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchJobDescription = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const jobMatch_service_1 = require("../services/jobMatch.service");
const matchJobDescription = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { resumeId, jobDescription, } = req.body;
        if (!resumeId || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume ID and Job Description are required.",
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
        const result = await (0, jobMatch_service_1.matchResumeWithJob)(resume.resumeText, jobDescription);
        return res.status(200).json({
            success: true,
            resume: {
                id: resume.id,
                title: resume.title,
                atsScore: resume.atsScore,
            },
            result: {
                matchScore: result.matchScore,
                matchingSkills: result.matchingSkills,
                missingSkills: result.missingSkills,
                suggestions: result.suggestions,
                summary: result.summary,
            },
        });
    }
    catch (error) {
        console.error("========== JOB MATCH ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.matchJobDescription = matchJobDescription;
//# sourceMappingURL=job.controller.js.map