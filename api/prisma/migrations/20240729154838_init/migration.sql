-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "email_client" TEXT NOT NULL,
    "assessment" TEXT NOT NULL,
    "answers" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_id_key" ON "answers"("id");
