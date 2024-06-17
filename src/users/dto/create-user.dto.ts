import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  class: string; // 반

  @IsNumber()
  studentId: number; // 번호

  @IsNumber()
  grade: number; // 학년

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}