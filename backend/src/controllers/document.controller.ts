import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  saveGeneratedDocument,
  getUserDocuments,
  deleteGeneratedDocument,
} from "../services/document.service";

export const createDocument = async (
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
      type,
      title,
      content,
    } = req.body;

    if (!type || !title || !content) {
      return res.status(400).json({
        success: false,
        message:
          "Type, title and content are required.",
      });
    }

    const document =
      await saveGeneratedDocument({
        userId: req.userId,
        resumeId,
        type,
        title,
        content,
      });

    return res.status(201).json({
      success: true,
      document,
    });

  } catch (error: any) {

    console.error(
      "========== CREATE DOCUMENT ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });
  }
};

export const getDocuments = async (
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

    const documents =
      await getUserDocuments(
        req.userId
      );

    return res.status(200).json({
      success: true,
      documents,
    });

  } catch (error: any) {

    console.error(
      "========== GET DOCUMENTS ERROR =========="
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });
  }
};export const deleteDocument = async (
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

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required.",
      });
    }

    await deleteGeneratedDocument(
      id,
      req.userId
    );

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });

  } catch (error: any) {

    console.error(
      "========== DELETE DOCUMENT ERROR =========="
    );

    console.error(error);

    if (
      error.message ===
      "Document not found."
    ) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message || "Server Error",
    });
  }
};