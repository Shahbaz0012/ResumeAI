import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { parseResume } from "../services/parseResume";
import { analyzeResume } from "../services/ai.service";

export const uploadResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    console.log(
      "========== RESUME UPLOAD =========="
    );

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    const title =
      req.body.title ||
      req.file.originalname;

    console.log("Reading PDF...");

    const extractedText =
      await parseResume(
        req.file.path
      );

    console.log("PDF Parsed");

    console.log(
      "Sending Resume To AI..."
    );

    const aiResult =
      await analyzeResume(
        extractedText
      );

    console.log(
      "AI Analysis Finished"
    );

    const resume =
      await prisma.resume.create({
        data: {
          title,
          fileUrl: req.file.path,
          atsScore:
            aiResult.atsScore,
          userId: req.userId,
        },
      });

    console.log(
      "Resume Saved:",
      resume.id
    );
    //part 2
        await prisma.analysis.create({
      data: {
        atsScore: aiResult.atsScore,

        summary: aiResult.summary,

        skills: JSON.stringify(
          aiResult.skills
        ),

        missingSkills: JSON.stringify(
          aiResult.missingSkills
        ),

        strengths: JSON.stringify(
          aiResult.strengths
        ),

        improvements: JSON.stringify(
          aiResult.improvements
        ),

        recommendedRoles: JSON.stringify(
          aiResult.recommendedRoles
        ),

        resumeId: resume.id,
      },
    });

    console.log(
      "Analysis Saved Successfully"
    );

    return res.status(200).json({
      success: true,

      message:
        "Resume uploaded and analyzed successfully.",

      resume,

      analysis: aiResult,
    });

  } catch (error: any) {

    console.error(
      "========== RESUME ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }
};

export const getResumeAnalysis = async (
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

    const { id } = req.params;

    const resume =
      await prisma.resume.findFirst({
        where: {
          id,
          userId: req.userId,
        },

        include: {
          analyses: true,
        },
      });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const analysis =
      resume.analyses[0];
          if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
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

        skills: JSON.parse(
          analysis.skills
        ),

        missingSkills: JSON.parse(
          analysis.missingSkills
        ),

        strengths: JSON.parse(
          analysis.strengths
        ),

        improvements: JSON.parse(
          analysis.improvements
        ),

        recommendedRoles: JSON.parse(
          analysis.recommendedRoles
        ),
      },
    });

  } catch (error: any) {

    console.error(
      "========== GET RESULT ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }
};

export const getResumeHistory = async (
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

    const resumes =
      await prisma.resume.findMany({
        where: {
          userId: req.userId,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          analyses: true,
        },
      });
          const history = resumes.map(
      (resume) => ({
        id: resume.id,

        title: resume.title,

        atsScore: resume.atsScore,

        createdAt: resume.createdAt,

        analysis:
          resume.analyses.length > 0
            ? {
                summary:
                  resume.analyses[0]
                    .summary,

                skills: JSON.parse(
                  resume.analyses[0]
                    .skills
                ),

                missingSkills: JSON.parse(
                  resume.analyses[0]
                    .missingSkills
                ),

                strengths: JSON.parse(
                  resume.analyses[0]
                    .strengths
                ),

                improvements: JSON.parse(
                  resume.analyses[0]
                    .improvements
                ),

                recommendedRoles: JSON.parse(
                  resume.analyses[0]
                    .recommendedRoles
                ),
              }
            : null,
      })
    );

    return res.status(200).json({
      success: true,
      history,
    });

  } catch (error: any) {

    console.error(
      "========== HISTORY ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }
};

export const deleteResume = async (
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

    const { id } = req.params;

    const resume =
      await prisma.resume.findFirst({
        where: {
          id,
          userId: req.userId,
        },
      });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
        await prisma.analysis.deleteMany({
      where: {
        resumeId: id,
      },
    });

    await prisma.resume.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully.",
    });

  } catch (error: any) {

    console.error(
      "========== DELETE ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }
};