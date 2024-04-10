import {
  QuestionEntity,
  QuestionType,
} from '@/questions/entities/question.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateQuestionGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  creatorId?: string;
}
