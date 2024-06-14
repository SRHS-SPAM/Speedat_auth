import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { 
  @PrimaryGeneratedColumn() 
  id: number; // Primary key (usually auto-incrementing)

  @Column({ unique: true }) 
  email: string; // Email must be unique for each user

  @Column() 
  password?: string; // Optional password field - good practice to handle this carefully (see security notes below)

  @Column()
  name: string; 

  @Column()
  class: string; // Assuming "class" refers to a student class 

  @Column()
  number: string; // Could represent a student ID number 

  @Column({ nullable: true }) 
  refreshToken?: string; // Optional - for storing refresh tokens (if you're using them for authentication)
}