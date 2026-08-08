/*
  Warnings:

  - The `strengths` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `missingSkills` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `improvements` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recommendedRoles` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('COVER_LETTER', 'RESUME_SUMMARY', 'INTERVIEW_PREP', 'COLD_EMAIL', 'OTHER');

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[],
DROP COLUMN "missingSkills",
ADD COLUMN     "missingSkills" TEXT[],
DROP COLUMN "improvements",
ADD COLUMN     "improvements" TEXT[],
DROP COLUMN "recommendedRoles",
ADD COLUMN     "recommendedRoles" TEXT[],
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "GeneratedDocument" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
