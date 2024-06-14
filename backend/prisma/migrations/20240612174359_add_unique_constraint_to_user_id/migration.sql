/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `EmailVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_userId_key" ON "EmailVerification"("userId");
