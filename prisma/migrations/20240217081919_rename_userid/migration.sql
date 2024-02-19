/*
  Warnings:

  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `socials` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `userid` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `socials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "socials" DROP CONSTRAINT "socials_userId_fkey";

-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_userId_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "socials" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
