  import {
    IsEmail,
    IsOptional,
    IsNumber,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsNumber()
    @IsOptional()
    grade?: number;
  
    @IsNumber()
    @IsOptional()
    class?: number;
  
    @IsNumber()
    @IsOptional()
    number?: number;
  
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;
  }
