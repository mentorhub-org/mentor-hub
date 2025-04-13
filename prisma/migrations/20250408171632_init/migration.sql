/*
  Warnings:

  - You are about to drop the column `receiverId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `message` table. All the data in the column will be lost.
  - You are about to alter the column `url` on the `portfolio_link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url` on the `social_link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `email` on the `user_details` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `user_details` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Made the column `isRead` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banned` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `available` on table `user_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `verification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `verification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_receiverId_fkey";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "message" DROP COLUMN "receiverId",
DROP COLUMN "updatedAt",
ADD COLUMN     "chatId" TEXT NOT NULL,
ALTER COLUMN "isRead" SET NOT NULL;

-- AlterTable
ALTER TABLE "portfolio_link" ALTER COLUMN "url" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "social_link" ALTER COLUMN "url" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "banned" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_details" DROP COLUMN "email",
DROP COLUMN "token",
ALTER COLUMN "skills" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "available" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_membership" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_membership_chatId_userId_key" ON "chat_membership"("chatId", "userId");

-- AddForeignKey
ALTER TABLE "chat_membership" ADD CONSTRAINT "chat_membership_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_membership" ADD CONSTRAINT "chat_membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
