/*
  Warnings:

  - The values [APPROVED] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('PENDING', 'REJECTED', 'COMPLETED', 'CANCELLED', 'UPCOMING');
ALTER TABLE "mentoring_session" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "mentoring_session" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "SessionStatus_old";
ALTER TABLE "mentoring_session" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
