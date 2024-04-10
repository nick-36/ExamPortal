/*
  Warnings:

  - The `visibility` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visibility` column on the `TestGroup` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "category" DROP NOT NULL,
DROP COLUMN "visibility",
ADD COLUMN     "visibility" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "TestGroup" DROP COLUMN "visibility",
ADD COLUMN     "visibility" BOOLEAN DEFAULT true;
