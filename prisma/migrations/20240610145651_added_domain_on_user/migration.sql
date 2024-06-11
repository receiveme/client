/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "domain" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_domain_key" ON "users"("domain");
