/*
  Warnings:

  - You are about to drop the column `particletoken` on the `socials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "socials" DROP COLUMN "particletoken",
ADD COLUMN     "particle_token" TEXT;
