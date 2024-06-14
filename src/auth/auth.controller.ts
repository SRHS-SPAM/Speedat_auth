import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    const tempPassword = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await this.usersService.findByEmail(email);
    if (user) {
      await this.usersService.update(user._id.toString(), { // MongoDB ID 사용
        password: hashedPassword,
      });

      await this.mailerService.sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
        text: `Your temporary password is: ${tempPassword}`,
      });

      return {
        message: 'Password reset successful. Please check your email.',
      };
    } else {
      return {
        message: 'User not found',
      };
    }
  }

  private generateRandomPassword(): string {
    const length = 6;
    const charset = '0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  }
}