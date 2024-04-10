import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  creatorId?: string;
}
