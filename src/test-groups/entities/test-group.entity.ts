import { ApiProperty } from '@nestjs/swagger';
import { TestGroup } from '@prisma/client';
import { TestEntity } from '@/tests/entities/test.entity';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UserEntity } from '@/users/entities/user.entity';

export class TestGroupEntity {
  @ApiProperty()
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
  tests: TestEntity[];

  @ApiProperty()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty()
  @IsNotEmpty()
  creator: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  visibility: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  tags: string[];

  constructor(partial: Partial<TestGroupEntity>) {
    Object.assign(this, partial);
  }
}
