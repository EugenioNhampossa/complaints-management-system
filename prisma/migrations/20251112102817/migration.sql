/*
  Warnings:

  - You are about to drop the column `IdNumber` on the `personalInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idNumber]` on the table `personalInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idNumber` to the `personalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "personalInfo_IdNumber_key";

-- AlterTable
ALTER TABLE "personalInfo" DROP COLUMN "IdNumber",
ADD COLUMN     "idNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "personalInfo_idNumber_key" ON "personalInfo"("idNumber");
