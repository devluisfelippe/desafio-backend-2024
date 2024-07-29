/*
  Warnings:

  - Added the required column `satisfaction_id` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "satisfaction_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_satisfaction_id_fkey" FOREIGN KEY ("satisfaction_id") REFERENCES "satisfaction_survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
