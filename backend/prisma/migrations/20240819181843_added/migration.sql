-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionExpirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
