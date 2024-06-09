/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropIndex
DROP INDEX "Application_userId_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_username_key" ON "Application"("username");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
