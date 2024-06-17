import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    grade: number;
  
    @IsNumber()
    @IsNotEmpty()
    class: number;
  
    @IsNumber()
    @IsNotEmpty()
    number: number;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
  }