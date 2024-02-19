/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `socials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "socials" DROP COLUMN "imageUrl",
ADD COLUMN     "imageurl" TEXT;
