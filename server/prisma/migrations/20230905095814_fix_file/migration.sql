/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Genre` table. All the data in the column will be lost.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Movie` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `score` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
DROP COLUMN "movieId",
ADD COLUMN     "genre_id" SERIAL NOT NULL,
ADD COLUMN     "movie_id" INTEGER,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id");

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "origin",
DROP COLUMN "poster",
DROP COLUMN "updateAt",
DROP COLUMN "userId",
DROP COLUMN "year",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" SERIAL NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("movie_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updateAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Score";

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE;
