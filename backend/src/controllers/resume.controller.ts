import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { parseResume } from "../services/parseResume";

export const uploadResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("========== UPLOAD START ==========");
    console.log("User ID:", req.userId);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const title =
      req.body.title || req.file.originalname;

    console.log("Parsing PDF...");

    const extractedText = await parseResume(
      req.file.path
    );

    console.log(
      "PDF Parsed Successfully"
    );

    const resume = await prisma.resume.create({
      data: {
        title,
        fileUrl: req.file.path,
        userId: req.userId,
      },
    });

    console.log(
      "Resume Saved Successfully"
    );

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
      extractedText,
    });

  } catch (error: any) {

    console.error("========== UPLOAD ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });

  }
};