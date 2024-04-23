-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalePost" (
    "title" TEXT NOT NULL,
    "img" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,
    "languageLang" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Language" (
    "lang" TEXT NOT NULL,
    "fullLang" TEXT,
    "alternativeLang" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_key_key" ON "Post"("key");

-- CreateIndex
CREATE UNIQUE INDEX "LocalePost_postId_languageLang_key" ON "LocalePost"("postId", "languageLang");

-- CreateIndex
CREATE UNIQUE INDEX "Language_lang_key" ON "Language"("lang");

-- AddForeignKey
ALTER TABLE "LocalePost" ADD CONSTRAINT "LocalePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalePost" ADD CONSTRAINT "LocalePost_languageLang_fkey" FOREIGN KEY ("languageLang") REFERENCES "Language"("lang") ON DELETE RESTRICT ON UPDATE CASCADE;
