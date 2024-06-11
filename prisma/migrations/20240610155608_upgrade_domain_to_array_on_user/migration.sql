/*
  Warnings:

  - The `domain` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "domain",
ADD COLUMN     "domain" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "users_domain_key" ON "users"("domain");
