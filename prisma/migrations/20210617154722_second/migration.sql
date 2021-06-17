/*
  Warnings:

  - You are about to drop the column `comments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `coinflips` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pets` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileViews` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "comments",
DROP COLUMN "published",
DROP COLUMN "views";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "coinflips",
DROP COLUMN "country",
DROP COLUMN "pets",
DROP COLUMN "profileViews";

-- CreateIndex
CREATE UNIQUE INDEX "Post.title_unique" ON "Post"("title");
