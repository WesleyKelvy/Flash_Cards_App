/*
  Warnings:

  - You are about to drop the `Words` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Words";

-- CreateTable
CREATE TABLE "deck" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
