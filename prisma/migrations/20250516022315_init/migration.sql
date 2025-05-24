/*
  Warnings:

  - You are about to drop the column `streamRegistered` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "streamRegistered" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "streamRegistered";
