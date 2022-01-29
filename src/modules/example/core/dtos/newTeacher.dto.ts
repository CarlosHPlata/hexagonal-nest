import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsEmail } from 'class-validator';

export enum grades {
  LIC = 'LIC',
  DR = 'DR',
  MASTER = 'Master'
}

export class NewTeacherDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(grades)
  grade: string;
}
