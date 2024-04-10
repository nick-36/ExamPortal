import { PrismaClient } from '@prisma/client';
import { seedData } from './dummySeedData';
import { create } from 'domain';
const prisma = new PrismaClient();

async function seed() {
  try {
    // Insert seed data for users
    await Promise.all(
      seedData.users.map(async (user) => {
        await prisma.user.upsert({
          where: { id: user.id },
          update: user,
          create: user,
        });
      }),
    );

    // Insert seed data for tests
    await Promise.all(
      seedData.tests.map(async (test) => {
        await prisma.test.upsert({
          where: { id: test.id },
          update: {},
          create: {
            ...test,
            questions: {
              create: seedData.questions,
            },
          },
        });
      }),
    );

    // // Insert seed data for test groups
    // await Promise.all(
    //   seedData.testGroups.map(async (testGroup) => {
    //     await prisma.testGroup.create({
    //       data: {
    //         ...testGroup,
    //         tests:{
    //           create:seedData.tests
    //         }
    //       },
    //     });
    //   }),
    // );

    // Insert seed data for questions
    await Promise.all(
      seedData.questions.map(async (question) => {
        await prisma.question.upsert({
          where: { id: question.id },
          update: {},
          create: question,
        });
      }),
    );

    // Insert seed data for question groups
    await Promise.all(
      seedData.questionGroups.map(async (questionGroup) => {
        await prisma.questionGroup.upsert({
          where: { id: questionGroup.id },
          update: {},
          create: questionGroup,
        });
      }),
    );

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await seed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
