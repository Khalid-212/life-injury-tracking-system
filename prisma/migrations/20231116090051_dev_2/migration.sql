/*
  Warnings:

  - You are about to drop the `_InjuryToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `injuredPersonName` to the `Injury` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injuryDate` to the `Injury` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injuryTime` to the `Injury` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedById` to the `Injury` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Injury` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InjuryToUser" DROP CONSTRAINT "_InjuryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_InjuryToUser" DROP CONSTRAINT "_InjuryToUser_B_fkey";

-- AlterTable
ALTER TABLE "Injury" ADD COLUMN     "injuredPersonName" TEXT NOT NULL,
ADD COLUMN     "injuryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "injuryTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reportedById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_InjuryToUser";

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
