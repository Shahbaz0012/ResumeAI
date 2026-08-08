import { Response } from "express";

import prisma from "../config/prisma";

import { AuthRequest } from "../middleware/auth.middleware";

import { improveResume } from "../services/improve.service";

import { saveGeneratedDocument } from "../services/document.service";

export const improveResumeController = async (
  req: AuthRequest,
  res: Response
) => {

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
        message:
          "Resume ID is required.",
      });
    }

    const resume =
      await prisma.resume.findFirst({
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
        message:
          "Resume text not found. Please upload the resume again.",
      });
    }

    const result =
      await improveResume(
        resume.resumeText
      );

    const improvementContent = JSON.stringify({
      professionalSummary:
        result.professionalSummary,

      improvedSkills:
        result.improvedSkills,

      experienceRewrite:
        result.experienceRewrite,

      projectSuggestions:
        result.projectSuggestions,

      atsKeywords:
        result.atsKeywords,

      finalTips:
        result.finalTips,
    });    const document =
      await saveGeneratedDocument({
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
        professionalSummary:
          result.professionalSummary,

        improvedSkills:
          result.improvedSkills,

        experienceRewrite:
          result.experienceRewrite,

        projectSuggestions:
          result.projectSuggestions,

        atsKeywords:
          result.atsKeywords,

        finalTips:
          result.finalTips,
      },
    });

  } catch (error: any) {

    console.error(
      "========== RESUME IMPROVEMENT ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }

};