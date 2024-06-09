-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_schemeId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_username_fkey";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- CreateTable
CREATE TABLE "_ApplicationToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ApplicationToSchemes" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToUser_AB_unique" ON "_ApplicationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToUser_B_index" ON "_ApplicationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToSchemes_AB_unique" ON "_ApplicationToSchemes"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToSchemes_B_index" ON "_ApplicationToSchemes"("B");

-- AddForeignKey
ALTER TABLE "_ApplicationToUser" ADD CONSTRAINT "_ApplicationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("applicationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToUser" ADD CONSTRAINT "_ApplicationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToSchemes" ADD CONSTRAINT "_ApplicationToSchemes_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("applicationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToSchemes" ADD CONSTRAINT "_ApplicationToSchemes_B_fkey" FOREIGN KEY ("B") REFERENCES "Schemes"("schemeId") ON DELETE CASCADE ON UPDATE CASCADE;
