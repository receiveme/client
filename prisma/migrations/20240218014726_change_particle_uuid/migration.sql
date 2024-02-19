/*
  Warnings:

  - You are about to drop the column `particleUserToken` on the `socials` table. All the data in the column will be lost.
  - Added the required column `particle_uuid` to the `socials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "socials" DROP COLUMN "particleUserToken",
ADD COLUMN     "particle_uuid" TEXT NOT NULL;
