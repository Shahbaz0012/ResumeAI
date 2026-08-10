"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGeneratedDocument = exports.getUserDocuments = exports.saveGeneratedDocument = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const saveGeneratedDocument = async (data) => {
    const document = await prisma_1.default.generatedDocument.create({
        data: {
            userId: data.userId,
            resumeId: data.resumeId,
            // FIX: Cast the string to the Prisma Enum type
            type: data.type,
            title: data.title,
            content: data.content,
        },
    });
    return document;
};
exports.saveGeneratedDocument = saveGeneratedDocument;
const getUserDocuments = async (userId) => {
    const documents = await prisma_1.default.generatedDocument.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            resume: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
    return documents;
};
exports.getUserDocuments = getUserDocuments;
const deleteGeneratedDocument = async (documentId, userId) => {
    const document = await prisma_1.default.generatedDocument.findFirst({
        where: {
            id: documentId,
            userId,
        },
    });
    if (!document) {
        throw new Error("Document not found.");
    }
    await prisma_1.default.generatedDocument.delete({
        where: {
            id: documentId,
        },
    });
    return true;
};
exports.deleteGeneratedDocument = deleteGeneratedDocument;
//# sourceMappingURL=document.service.js.map