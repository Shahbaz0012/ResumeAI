import prisma from "../config/prisma";

interface SaveDocumentData {
  userId: string;
  resumeId?: string;
  type: string;
  title: string;
  content: string;
}

export const saveGeneratedDocument = async (
  data: SaveDocumentData
) => {
  const document =
    await prisma.generatedDocument.create({
      data: {
        userId: data.userId,
        resumeId: data.resumeId,
        type: data.type,
        title: data.title,
        content: data.content,
      },
    });

  return document;
};

export const getUserDocuments = async (
  userId: string
) => {
  const documents =
    await prisma.generatedDocument.findMany({
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
};export const deleteGeneratedDocument = async (
  documentId: string,
  userId: string
) => {
  const document =
    await prisma.generatedDocument.findFirst({
      where: {
        id: documentId,
        userId,
      },
    });

  if (!document) {
    throw new Error(
      "Document not found."
    );
  }

  await prisma.generatedDocument.delete({
    where: {
      id: documentId,
    },
  });

  return true;
};