/*
  Warnings:

  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN "description" TEXT NOT NULL DEFAULT '';



