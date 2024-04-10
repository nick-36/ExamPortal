/*
  Warnings:

  - Added the required column `totalMarks` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Made the column `testGroupId` on table `Test` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_testGroupId_fkey";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "totalMarks" INTEGER NOT NULL,
ALTER COLUMN "testGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testGroupId_fkey" FOREIGN KEY ("testGroupId") REFERENCES "TestGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
