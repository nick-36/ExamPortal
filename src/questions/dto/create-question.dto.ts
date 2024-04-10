import { ApiProperty } from '@nestjs/swagger';
import { QuestionType, DifficultyType } from '../entities/question.entity';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { UserEntity } from '@/users/entities/user.entity';

export class CreateQuestionDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  type: QuestionType;

  @IsOptional()
  options?: string[];

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @IsOptional()
  @IsString()
  category?: string | null;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  attachment?: string | null;

  @IsOptional()
  createdAt?: Date | string;

  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsString()
  testGroupId?: string | null;

  @IsOptional()
  @IsString()
  difficulty?: DifficultyType;

  @IsOptional()
  questionGroups?: any;
}
