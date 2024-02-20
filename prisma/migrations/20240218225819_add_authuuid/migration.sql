/*
  Warnings:

  - You are about to drop the column `uuid` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "uuid",
ADD COLUMN     "authuuid" TEXT;
