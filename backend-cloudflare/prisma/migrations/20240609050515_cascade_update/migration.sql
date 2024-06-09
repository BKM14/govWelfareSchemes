-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_schemeId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Schemes"("schemeId") ON DELETE CASCADE ON UPDATE CASCADE;
