/*
  Warnings:

  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DirectMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `server` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED', 'UPCOMING');

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_memberOneId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_memberTwoId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_memberId_fkey";

-- DropForeignKey
ALTER TABLE "channel" DROP CONSTRAINT "channel_profileId_fkey";

-- DropForeignKey
ALTER TABLE "channel" DROP CONSTRAINT "channel_serverId_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_profileId_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_serverId_fkey";

-- DropForeignKey
ALTER TABLE "server" DROP CONSTRAINT "server_profileId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "DirectMessage";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "channel";

-- DropTable
DROP TABLE "member";

-- DropTable
DROP TABLE "server";

-- DropTable
DROP TABLE "session";

-- DropEnum
DROP TYPE "ChannelType";

-- DropEnum
DROP TYPE "MemberRole";

-- CreateTable
CREATE TABLE "mentoring_session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,
    "thumbnail" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "status" "SessionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentoring_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
