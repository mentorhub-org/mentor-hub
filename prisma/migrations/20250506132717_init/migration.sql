-- CreateTable
CREATE TABLE "profile_social_links" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "telegram" TEXT,
    "whatsapp" TEXT,
    "x" TEXT,

    CONSTRAINT "profile_social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_work_links" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "linkedin" TEXT,
    "github" TEXT,
    "behance" TEXT,
    "dribbble" TEXT,
    "youtube" TEXT,
    "pinterest" TEXT,

    CONSTRAINT "profile_work_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_social_links_profileId_key" ON "profile_social_links"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_work_links_profileId_key" ON "profile_work_links"("profileId");

-- AddForeignKey
ALTER TABLE "profile_social_links" ADD CONSTRAINT "profile_social_links_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_work_links" ADD CONSTRAINT "profile_work_links_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
