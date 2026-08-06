/*
  Warnings:

  - You are about to drop the column `aiSuggestions` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `grammarScore` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `interviewReadiness` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `keywordScore` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `overallScore` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `weaknesses` on the `Analysis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `atsScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `improvements` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendedRoles` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "aiSuggestions",
DROP COLUMN "grammarScore",
DROP COLUMN "interviewReadiness",
DROP COLUMN "keywordScore",
DROP COLUMN "overallScore",
DROP COLUMN "weaknesses",
ADD COLUMN     "atsScore" INTEGER NOT NULL,
ADD COLUMN     "improvements" TEXT NOT NULL,
ADD COLUMN     "recommendedRoles" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_resumeId_key" ON "Analysis"("resumeId");
