import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { parseResume } from "../services/parseResume";
import { analyzeResume } from "../services/ai.service";

// ==========================================
// UPLOAD + ANALYZE RESUME
// ==========================================
export const uploadResume = async (req: AuthRequest, res: Response) => {
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
    const extractedText = await parseResume(req.file.path);
    console.log("PDF Parsed");

    console.log("Sending Resume To AI...");
    const aiResult = await analyzeResume(extractedText);
    console.log("AI Analysis Finished");

    const resume = await prisma.resume.create({
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
    // SAVE AI ANALYSIS (Updated to use native arrays)
    // ==========================================
    await prisma.analysis.create({
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
  } catch (error: any) {
    console.error("========== RESUME ERROR ==========");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ==========================================
// GET SINGLE RESUME ANALYSIS
// ==========================================
export const getResumeAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
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
      // Updated to remove JSON.parse() since Prisma returns arrays natively now
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
  } catch (error: any) {
    console.error("========== GET RESULT ERROR ==========");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ==========================================
// GET RESUME HISTORY
// ==========================================
export const getResumeHistory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const resumes = await prisma.resume.findMany({
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

    const history = resumes.map((resume) => ({
      id: resume.id,
      title: resume.title,
      atsScore: resume.atsScore,
      createdAt: resume.createdAt,
      // Updated to remove JSON.parse() here as well
      analysis: resume.analysis
        ? {
            summary: resume.analysis.summary,
            skills: resume.analysis.skills,
            missingSkills: resume.analysis.missingSkills,
            strengths: resume.analysis.strengths,
            improvements: resume.analysis.improvements,
            recommendedRoles: resume.analysis.recommendedRoles,
          }
        : null,
    }));

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error: any) {
    console.error("========== HISTORY ERROR ==========");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ==========================================
// DELETE RESUME
// ==========================================
export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    // Analysis will be deleted automatically because of onDelete: Cascade.
    await prisma.resume.delete({
      where: {
        id: resume.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error: any) {
    console.error("========== DELETE ERROR ==========");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};