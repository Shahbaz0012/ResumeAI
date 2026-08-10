"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.getResumeHistory = exports.getResumeAnalysis = exports.uploadResume = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const parseResume_1 = require("../services/parseResume");
const ai_service_1 = require("../services/ai.service");
// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================
const uploadResume = async (req, res) => {
    try {
        console.log("========== RESUME UPLOAD ==========");
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No resume uploaded." });
        }
        const title = req.body.title || req.file.originalname;
        console.log("Reading PDF...");
        const extractedText = await (0, parseResume_1.parseResume)(req.file.path);
        console.log("PDF Parsed");
        console.log("Sending Resume To AI...");
        const aiResult = await (0, ai_service_1.analyzeResume)(extractedText);
        console.log("AI Analysis Finished");
        const resume = await prisma_1.default.resume.create({
            data: {
                title,
                fileUrl: req.file.path,
                resumeText: extractedText,
                atsScore: aiResult.atsScore,
                userId: req.userId,
            },
        });
        console.log("Resume Saved:", resume.id);
        // ==========================================
        // SAVE AI ANALYSIS
        // ==========================================
        await prisma_1.default.analysis.create({
            data: {
                atsScore: aiResult.atsScore,
                summary: aiResult.summary,
                skills: aiResult.skills,
                missingSkills: aiResult.missingSkills,
                strengths: aiResult.strengths,
                improvements: aiResult.improvements,
                recommendedRoles: aiResult.recommendedRoles,
                resumeId: resume.id,
            },
        });
        console.log("Analysis Saved Successfully");
        return res.status(200).json({
            success: true,
            message: "Resume uploaded and analyzed successfully.",
            resume,
            analysis: aiResult,
        });
    }
    catch (error) {
        console.error("========== RESUME ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.uploadResume = uploadResume;
// ==========================================
// GET SINGLE RESUME ANALYSIS
// ==========================================
const getResumeAnalysis = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        // FIX: Explicitly cast id as a string
        const id = req.params.id;
        const resume = await prisma_1.default.resume.findFirst({
            where: {
                id,
                userId: req.userId,
            },
            include: {
                analysis: true,
            },
        });
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }
        // FIX: Bypass TS missing property error in case Prisma types are stale
        const analysis = resume.analysis;
        if (!analysis) {
            return res.status(404).json({ success: false, message: "Analysis not found" });
        }
        return res.status(200).json({
            success: true,
            resume: {
                id: resume.id,
                title: resume.title,
                atsScore: resume.atsScore,
                createdAt: resume.createdAt,
            },
            analysis: {
                atsScore: analysis.atsScore,
                summary: analysis.summary,
                skills: analysis.skills,
                missingSkills: analysis.missingSkills,
                strengths: analysis.strengths,
                improvements: analysis.improvements,
                recommendedRoles: analysis.recommendedRoles,
            },
        });
    }
    catch (error) {
        console.error("========== GET RESULT ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.getResumeAnalysis = getResumeAnalysis;
// ==========================================
// GET RESUME HISTORY
// ==========================================
const getResumeHistory = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const resumes = await prisma_1.default.resume.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                analysis: true,
            },
        });
        const history = resumes.map((resume) => {
            // FIX: Bypass TS missing property error
            const analysis = resume.analysis;
            return {
                id: resume.id,
                title: resume.title,
                atsScore: resume.atsScore,
                createdAt: resume.createdAt,
                analysis: analysis
                    ? {
                        summary: analysis.summary,
                        skills: analysis.skills,
                        missingSkills: analysis.missingSkills,
                        strengths: analysis.strengths,
                        improvements: analysis.improvements,
                        recommendedRoles: analysis.recommendedRoles,
                    }
                    : null,
            };
        });
        return res.status(200).json({
            success: true,
            history,
        });
    }
    catch (error) {
        console.error("========== HISTORY ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.getResumeHistory = getResumeHistory;
// ==========================================
// DELETE RESUME
// ==========================================
const deleteResume = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        // FIX: Explicitly cast id as a string
        const id = req.params.id;
        const resume = await prisma_1.default.resume.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }
        await prisma_1.default.resume.delete({
            where: {
                id: resume.id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully.",
        });
    }
    catch (error) {
        console.error("========== DELETE ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.deleteResume = deleteResume;
//# sourceMappingURL=resume.controller.js.map