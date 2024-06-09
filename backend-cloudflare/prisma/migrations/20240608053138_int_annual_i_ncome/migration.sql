/*
  Warnings:

  - Changed the type of `annualIncome` on the `Schemes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schemes" DROP COLUMN "annualIncome",
ADD COLUMN     "annualIncome" INTEGER NOT NULL;
