-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STUDENT', 'EDUCATOR');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'SHORT_ANSWER', 'ESSAY');

-- CreateEnum
CREATE TYPE "QuestionDifficultyType" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "mobile" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "passingScore" INTEGER NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visibility" TEXT NOT NULL,
    "status" TEXT,
    "tags" TEXT[],
    "testGroupId" TEXT,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visibility" TEXT NOT NULL,
    "status" TEXT,
    "tags" TEXT[],

    CONSTRAINT "TestGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "attachment" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT,
    "testId" TEXT,
    "difficulty" "QuestionDifficultyType" DEFAULT 'EASY',

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionGroupToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionGroupToQuestion_AB_unique" ON "_QuestionGroupToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionGroupToQuestion_B_index" ON "_QuestionGroupToQuestion"("B");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testGroupId_fkey" FOREIGN KEY ("testGroupId") REFERENCES "TestGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestGroup" ADD CONSTRAINT "TestGroup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionGroupToQuestion" ADD CONSTRAINT "_QuestionGroupToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionGroupToQuestion" ADD CONSTRAINT "_QuestionGroupToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
