-- CreateTable
CREATE TABLE "signup_verifications" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signup_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signup_verifications_email_key" ON "signup_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "signup_verifications_tokenHash_key" ON "signup_verifications"("tokenHash");
