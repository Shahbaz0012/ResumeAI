import { Response } from "express";

import prisma from "../config/prisma";

import { AuthRequest } from "../middleware/auth.middleware";

import { generateCoverLetter } from "../services/coverLetter.service";

import { saveGeneratedDocument } from "../services/document.service";

export const generateCoverLetterController = async (
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

    const {
      resumeId,
      jobDescription,
    } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message:
          "Resume ID and Job Description are required.",
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

    const coverLetter =
      await generateCoverLetter(
        resume.resumeText,
        jobDescription
      );

    const document =
      await saveGeneratedDocument({
        userId: req.userId,
        resumeId: resume.id,
        type: "COVER_LETTER",
        title: `Cover Letter - ${resume.title}`,
        content: coverLetter,
      });    return res.status(200).json({
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

  } catch (error: any) {

    console.error(
      "========== COVER LETTER ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }

};