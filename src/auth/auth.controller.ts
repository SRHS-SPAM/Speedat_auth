import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    Get,
    NotFoundException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './local-auth.guard';
  import { UsersService } from '../users/users.service';
  import { CreateUserDto } from '../users/dto/create-user.dto';
  import * as bcrypt from 'bcrypt';
  import * as nodemailer from 'nodemailer';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService,
      private usersService: UsersService,
    ) {}
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @Post('reset-password')
    async resetPassword(@Body('email') email: string): Promise<any> {
      const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
  
      // 사용자 정보 업데이트 (임시 비밀번호로)
      const updatedUser = await this.usersService.updatePasswordByEmail(
        email,
        hashedTempPassword,
      );
  
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
  
      // 이메일 발송 로직 추가
      await this.sendEmail(
        email, // 수신자 이메일 주소
        '임시 비밀번호 발급', // 이메일 제목
        `안녕하세요. <Speedat> 입니다. 귀하의 임시 비밀번호는 다음과 같습니다.: ${tempPassword}` // 이메일 내용
      );
  
      return { message: '임시 비밀번호가 이메일로 발송되었습니다.' };
    }
  
    private async sendEmail(
      to: string,
      subject: string,
      text: string,
    ): Promise<void> {
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', // SMTP 서버 주소
        port: 465, // SMTP 포트 (보안 연결 사용 시 465)
        secure: true, // 보안 연결 사용 여부 (SSL/TLS)
        auth: {
          user: 'verify@speedat.site', // Zoho 계정 이메일 주소
          pass: 'js9xUc!g', // Zoho 계정 비밀번호
        },
      });
  
      await transporter.sendMail({
        from: '"Speedat" <verify@speedat.site>', // 발신자 이름 및 이메일 주소
        to, // 수신자 이메일 주소
        subject, // 이메일 제목
        text, // 이메일 내용
      });
    }
  }