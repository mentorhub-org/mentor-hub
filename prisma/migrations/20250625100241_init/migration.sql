/*
  Warnings:

  - You are about to drop the column `endTime` on the `mentoring_session` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `mentoring_session` table. All the data in the column will be lost.
  - Added the required column `Duration` to the `mentoring_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `mentoring_session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mentoring_session" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "Duration" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
