/*
  Warnings:

  - You are about to drop the column `particleid` on the `socials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "socials" DROP COLUMN "particleid",
ADD COLUMN     "particletoken" TEXT;
