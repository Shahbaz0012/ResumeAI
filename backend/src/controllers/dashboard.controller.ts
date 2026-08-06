import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardStats = async (
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
      });

    const totalResumes =
      resumes.length;
          const highestATS =
      resumes.length > 0
        ? Math.max(
            ...resumes.map(
              (resume) =>
                resume.atsScore || 0
            )
          )
        : 0;

    const averageATS =
      resumes.length > 0
        ? Math.round(
            resumes.reduce(
              (sum, resume) =>
                sum +
                (resume.atsScore || 0),
              0
            ) / resumes.length
          )
        : 0;

    const latestResume =
      resumes.length > 0
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
              createdAt:
                latestResume.createdAt,
            }
          : null,
      },
    });
      } catch (error: any) {

    console.error(
      "========== DASHBOARD ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });

  }
};