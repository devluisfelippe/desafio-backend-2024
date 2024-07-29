/*
  Warnings:

  - You are about to drop the column `satisfaction_id` on the `answers` table. All the data in the column will be lost.
  - Added the required column `satisfaction_survey_id` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_satisfaction_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "satisfaction_id",
ADD COLUMN     "satisfaction_survey_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_satisfaction_survey_id_fkey" FOREIGN KEY ("satisfaction_survey_id") REFERENCES "satisfaction_survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
