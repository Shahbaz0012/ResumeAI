"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const resumes = await prisma_1.default.resume.findMany({
            where: {
                userId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const totalResumes = resumes.length;
        const highestATS = resumes.length > 0
            ? Math.max(...resumes.map((resume) => resume.atsScore || 0))
            : 0;
        const averageATS = resumes.length > 0
            ? Math.round(resumes.reduce((sum, resume) => sum +
                (resume.atsScore || 0), 0) / resumes.length)
            : 0;
        const latestResume = resumes.length > 0
            ? resumes[0]
            : null;
        return res.status(200).json({
            success: true,
            stats: {
                totalResumes,
                highestATS,
                averageATS,
                latestResume: latestResume
                    ? {
                        id: latestResume.id,
                        title: latestResume.title,
                        atsScore: latestResume.atsScore,
                        createdAt: latestResume.createdAt,
                    }
                    : null,
            },
        });
    }
    catch (error) {
        console.error("========== DASHBOARD ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboard.controller.js.map