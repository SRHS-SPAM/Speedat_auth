// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto, ResetPasswordDto } from './dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const { name, class: userClass, number, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser({
      name,
      class: userClass,
      number,
      email,
      password: hashedPassword,
      isTemporaryPassword: false,
    });
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { userId: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email } = resetPasswordDto;
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const temporaryPassword = this.generateTemporaryPassword();
    await this.usersService.updateUser(user.id, {
      password: await bcrypt.hash(temporaryPassword, 10),
      isTemporaryPassword: true,
    });

    await this.mailService.sendResetPasswordEmail(
      email,
      temporaryPassword,
    );
  }

  private generateTemporaryPassword(): string {
    const digits = '0123456789';
    let temporaryPassword = '';
    for (let i = 0; i < 6; i++) {
      temporaryPassword += digits.charAt(
        Math.floor(Math.random() * digits.length),
      );
    }
    return temporaryPassword;
  }
}