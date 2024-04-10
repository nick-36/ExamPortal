import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  EDUCATOR = 'EDUCATOR',
}

export class CreateUserDto {
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
  mobile: string;
}
