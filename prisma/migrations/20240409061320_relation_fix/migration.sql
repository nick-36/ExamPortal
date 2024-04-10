/*
  Warnings:

  - You are about to drop the column `testId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Test` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `QuestionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "testId";

-- AlterTable
ALTER TABLE "QuestionGroup" ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "testId" TEXT;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
