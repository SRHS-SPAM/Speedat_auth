import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updata-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 새로운 사용자 생성
  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.usersRepository.save({
      ...userData,
      password: hashedPassword,
    });
  }

  // 이메일로 사용자 찾기
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 이메일로 비밀번호 업데이트
  async updatePasswordByEmail(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
        throw new NotFoundException(`이메일이 ${email}인 사용자를 찾을 수 없습니다.`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  // 사용자 정보 업데이트
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException(`ID가 ${id}인 사용자를 찾을 수 없습니다.`);
    }

    // 비밀번호 변경 시 bcrypt 해싱
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });
  }
}
