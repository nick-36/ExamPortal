import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateTestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  passingScore: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  totalMarks: number;

  @ApiProperty()
  @IsString()
  testGroupId: string;
}
