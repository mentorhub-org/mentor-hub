/*
  Warnings:

  - You are about to drop the column `parentUserId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chat_membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portfolio_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `social_link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_details` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `dateOfBirth` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('TEXT', 'AUDIO', 'VIDEO');

-- DropForeignKey
ALTER TABLE "chat_membership" DROP CONSTRAINT "chat_membership_chatId_fkey";

-- DropForeignKey
ALTER TABLE "chat_membership" DROP CONSTRAINT "chat_membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_link" DROP CONSTRAINT "portfolio_link_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- DropForeignKey
ALTER TABLE "social_link" DROP CONSTRAINT "social_link_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_parentUserId_fkey";

-- DropForeignKey
ALTER TABLE "user_details" DROP CONSTRAINT "user_details_userId_fkey";

-- DropIndex
DROP INDEX "user_phone_key";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "parentUserId",
DROP COLUMN "phone",
ALTER COLUMN "emailVerified" DROP DEFAULT,
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "banned" DROP NOT NULL,
ALTER COLUMN "banned" DROP DEFAULT,
ALTER COLUMN "dateOfBirth" SET NOT NULL;

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "chat";

-- DropTable
DROP TABLE "chat_membership";

-- DropTable
DROP TABLE "message";

-- DropTable
DROP TABLE "portfolio_link";

-- DropTable
DROP TABLE "review";

-- DropTable
DROP TABLE "social_link";

-- DropTable
DROP TABLE "user_details";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "jobTitle" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "about" TEXT,
    "skills" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT,
    "inviteCode" TEXT,
    "description" TEXT,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ChannelType" NOT NULL,
    "profileId" TEXT,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "server_name_key" ON "server"("name");

-- CreateIndex
CREATE UNIQUE INDEX "member_serverId_profileId_key" ON "member"("serverId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "channel_name_key" ON "channel"("name");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server" ADD CONSTRAINT "server_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
