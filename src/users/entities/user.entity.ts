import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  class: string;

  @Column()
  number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}