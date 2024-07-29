/*
  Warnings:

  - Added the required column `status` to the `satisfaction_survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "satisfaction_survey" ADD COLUMN     "status" TEXT NOT NULL;
