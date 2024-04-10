import { ApiProperty } from '@nestjs/swagger';
import { Test } from '@prisma/client';
import { QuestionEntity } from '@/questions/entities/question.entity';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
} from 'class-validator';
import { TestGroupEntity } from '@/test-groups/entities/test-group.entity';
import { UserEntity } from '@/users/entities/user.entity';

export class TestEntity {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  passingScore: number;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  TestGroup: TestGroupEntity;

  @ApiProperty()
  @IsString()
  testGroupId: string;

  @ApiProperty()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty()
  creator: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  visibility: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  tags: string[];

  constructor(partial: Partial<TestEntity>) {
    Object.assign(this, partial);
  }
}
