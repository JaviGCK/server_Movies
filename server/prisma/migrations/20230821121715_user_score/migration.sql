-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_movieId_fkey";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
