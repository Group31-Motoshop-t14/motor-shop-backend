-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_carId_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
