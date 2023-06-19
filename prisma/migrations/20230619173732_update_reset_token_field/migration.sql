/*
  Warnings:

  - You are about to drop the column `reset_password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "reset_password",
ADD COLUMN     "reset_token" TEXT;
