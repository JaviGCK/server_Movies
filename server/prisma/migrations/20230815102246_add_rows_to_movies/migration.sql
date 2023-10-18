/*
  Warnings:

  - You are about to drop the column `url` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `origin` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1. Agregar columnas con valores predeterminados
ALTER TABLE "Movie" ADD COLUMN "origin" TEXT DEFAULT 'Unknown';
ALTER TABLE "Movie" ADD COLUMN "poster" TEXT DEFAULT '';
ALTER TABLE "Movie" ADD COLUMN "year" INTEGER DEFAULT 0;

-- 2. Actualizar registros existentes con valores para las nuevas columnas
UPDATE "Movie" SET "origin" = 'Unknown' WHERE "origin" IS NULL;
UPDATE "Movie" SET "poster" = '' WHERE "poster" IS NULL;
UPDATE "Movie" SET "year" = 0 WHERE "year" IS NULL;

-- 3. Modificar columnas para que sean NOT NULL después de asegurarse de que todos los registros tengan valores
ALTER TABLE "Movie" ALTER COLUMN "origin" SET NOT NULL;
ALTER TABLE "Movie" ALTER COLUMN "poster" SET NOT NULL;
ALTER TABLE "Movie" ALTER COLUMN "year" SET NOT NULL;

-- 4. Eliminar la columna url
ALTER TABLE "Movie" DROP COLUMN "url";

