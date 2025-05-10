/*
  Warnings:

  - You are about to drop the `profile_work_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile_work_links" DROP CONSTRAINT "profile_work_links_profileId_fkey";

-- AlterTable
ALTER TABLE "profile_social_links" ADD COLUMN     "behance" TEXT,
ADD COLUMN     "dribbble" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "pinterest" TEXT,
ADD COLUMN     "youtube" TEXT;

-- DropTable
DROP TABLE "profile_work_links";
