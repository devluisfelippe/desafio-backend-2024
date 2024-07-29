-- CreateTable
CREATE TABLE "satisfaction_survey" (
    "id" TEXT NOT NULL,
    "responsible_person" TEXT NOT NULL,
    "email_responsible_person" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "target_audience" TEXT NOT NULL,
    "questions" TEXT[],
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "satisfaction_survey_id_key" ON "satisfaction_survey"("id");
