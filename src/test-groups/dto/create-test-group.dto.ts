import { ApiProperty } from '@nestjs/swagger';
import { TestGroup } from '@prisma/client';
import { TestEntity } from '@/tests/entities/test.entity';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { UserEntity } from '@/users/entities/user.entity';

export class CreateTestGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  visibility?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  tags?: string[];

  @ApiProperty()
  creatorId?: string;
}
