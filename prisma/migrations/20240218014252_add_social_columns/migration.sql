/*
  Warnings:

  - You are about to drop the column `social` on the `socials` table. All the data in the column will be lost.
  - Added the required column `particleUserToken` to the `socials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "wallets_address_key";

-- AlterTable
ALTER TABLE "socials" DROP COLUMN "social",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "networkid" TEXT,
ADD COLUMN     "particleUserToken" TEXT NOT NULL,
ADD COLUMN     "particleid" TEXT;
