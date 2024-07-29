/*
  Warnings:

  - You are about to drop the column `answers` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "answers",
ADD COLUMN     "satisfaction_survey_answers" TEXT[];
