"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.getDocuments = exports.createDocument = void 0;
const document_service_1 = require("../services/document.service");
const createDocument = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { resumeId, type, title, content, } = req.body;
        if (!type || !title || !content) {
            return res.status(400).json({
                success: false,
                message: "Type, title and content are required.",
            });
        }
        const document = await (0, document_service_1.saveGeneratedDocument)({
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
    }
    catch (error) {
        console.error("========== CREATE DOCUMENT ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.createDocument = createDocument;
const getDocuments = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const documents = await (0, document_service_1.getUserDocuments)(req.userId);
        return res.status(200).json({
            success: true,
            documents,
        });
    }
    catch (error) {
        console.error("========== GET DOCUMENTS ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.getDocuments = getDocuments;
const deleteDocument = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        // FIX: Explicitly cast the id as a string to resolve the TS error
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Document ID is required.",
            });
        }
        await (0, document_service_1.deleteGeneratedDocument)(id, req.userId);
        return res.status(200).json({
            success: true,
            message: "Document deleted successfully.",
        });
    }
    catch (error) {
        console.error("========== DELETE DOCUMENT ERROR ==========");
        console.error(error);
        if (error.message === "Document not found.") {
            return res.status(404).json({
                success: false,
                message: "Document not found.",
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=document.controller.js.map