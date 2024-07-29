/*
  Warnings:

  - Changed the type of `assessment` on the `answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "assessment",
ADD COLUMN     "assessment" INTEGER NOT NULL;
