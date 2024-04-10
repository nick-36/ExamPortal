import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from '@prisma/client';
import { UserEntity } from '@/users/entities/user.entity';

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
}

export enum DifficultyType {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

type QuestionTypeKeys = keyof typeof QuestionType;
type DifficultyTypeKeys = keyof typeof DifficultyType;

export class QuestionEntity {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: QuestionTypeKeys;

  @ApiProperty({ type: [String], isArray: true })
  @IsArray()
  options: string[];

  @ApiProperty()
  @IsString()
  correctAnswer: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  difficulty?: DifficultyTypeKeys;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ type: [String], isArray: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  attachment?: string;

  @IsString()
  creatorId: string;

  @ApiProperty()
  creator: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  testGroupId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  constructor(partial: Partial<QuestionEntity>) {
    Object.assign(this, partial);
  }
}
