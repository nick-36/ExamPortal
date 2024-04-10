import { QuestionGroup } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { QuestionEntity } from '@/questions/entities/question.entity';
import { UserEntity } from '@/users/entities/user.entity';

export class QuestionGroupEntity {
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
  description?: string | null;

  @ApiProperty()
  questions: QuestionEntity[]; // Assuming you have defined QuestionEntity

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  creatorId: string;

  @ApiProperty()
  creator: UserEntity;

  constructor(partial: Partial<QuestionGroupEntity>) {
    Object.assign(this, partial);
  }
}
