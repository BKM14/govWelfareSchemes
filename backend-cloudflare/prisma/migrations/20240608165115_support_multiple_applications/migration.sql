/*
  Warnings:

  - You are about to drop the `_ApplicationToSchemes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApplicationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicationToSchemes" DROP CONSTRAINT "_ApplicationToSchemes_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToSchemes" DROP CONSTRAINT "_ApplicationToSchemes_B_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToUser" DROP CONSTRAINT "_ApplicationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToUser" DROP CONSTRAINT "_ApplicationToUser_B_fkey";

-- DropIndex
DROP INDEX "Application_schemeId_key";

-- DropIndex
DROP INDEX "Application_username_key";

-- DropTable
DROP TABLE "_ApplicationToSchemes";

-- DropTable
DROP TABLE "_ApplicationToUser";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Schemes"("schemeId") ON DELETE RESTRICT ON UPDATE CASCADE;
