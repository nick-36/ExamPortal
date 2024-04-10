// Import necessary modules and entities
import { v4 as uuidv4 } from 'uuid';

// Create dummy seed data for users
const users: any[] = [
  {
    id: uuidv4(),
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
    mobile: '1234567890',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const questions: any[] = [
  {
    id: uuidv4(),
    content: 'Sample question content 1',
    type: 'MULTIPLE_CHOICE',
    options: ['Option A', 'Option B', 'Option C'],
    correctAnswer: 'Option A',
    difficulty: 'EASY',
    category: 'Mathematics',
    tags: ['sample', 'question'],
    creatorId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
  },
  // Add more question data as needed
];

// Create dummy seed data for question groups
const questionGroups: any[] = [
  {
    id: uuidv4(),
    name: 'Sample Question Group 1',
    description: 'Description for Sample Question Group 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more question group data as needed
];

// Create dummy seed data for tests
const tests: any[] = [
  {
    id: uuidv4(),
    name: 'Sample Test 1',
    description: 'Description for Sample Test 1',
    category: 'Mathematics',
    duration: 60,
    passingScore: 70,
    creatorId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    visibility: true,
    status: 'published',
    tags: ['sample', 'test'],
    totalMarks: 100,
  },
  // Add more test data as needed
];

// Create dummy seed data for test groups
const testGroups: any[] = [
  {
    id: uuidv4(),
    name: 'Sample Test Group 1',
    description: 'Description for Sample Test Group 1',
    creatorId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    visibility: true,
    status: 'active',
    tags: ['sample', 'group'],
  },
];

// Export the dummy seed data
export const seedData = {
  users: users,
  tests: tests,
  testGroups: testGroups,
  questions: questions,
  questionGroups: questionGroups,
};
