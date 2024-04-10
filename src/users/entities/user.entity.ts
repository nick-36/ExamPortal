import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';
import { TestEntity } from '@/tests/entities/test.entity';
import { TestGroupEntity } from '@/test-groups/entities/test-group.entity';
import { QuestionEntity } from '@/questions/entities/question.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  EDUCATOR = 'EDUCATOR',
}

type UserRoleKeys = keyof typeof UserRole;

export class UserEntity implements User {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: UserRoleKeys;

  @ApiProperty()
  @IsString()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // Assuming you have defined TestEntity, TestGroupEntity, and QuestionEntity
  @ApiProperty({ type: [TestEntity], isArray: true })
  tests: TestEntity[];

  @ApiProperty({ type: [TestGroupEntity], isArray: true })
  testGroups: TestGroupEntity[];

  @ApiProperty({ type: [QuestionEntity], isArray: true })
  questions: QuestionEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
