"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoverLetterController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const coverLetter_service_1 = require("../services/coverLetter.service");
const document_service_1 = require("../services/document.service");
const generateCoverLetterController = async (req, res) => {
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
        const coverLetter = await (0, coverLetter_service_1.generateCoverLetter)(resume.resumeText, jobDescription);
        const document = await (0, document_service_1.saveGeneratedDocument)({
            userId: req.userId,
            resumeId: resume.id,
            type: "COVER_LETTER",
            title: `Cover Letter - ${resume.title}`,
            content: coverLetter,
        });
        return res.status(200).json({
            success: true,
            resume: {
                id: resume.id,
                title: resume.title,
            },
            document: {
                id: document.id,
                type: document.type,
                title: document.title,
                createdAt: document.createdAt,
            },
            coverLetter,
        });
    }
    catch (error) {
        console.error("========== COVER LETTER ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.generateCoverLetterController = generateCoverLetterController;
//# sourceMappingURL=coverLetter.controller.js.map