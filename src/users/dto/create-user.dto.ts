// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  class: string;

  @IsString()
  number: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}