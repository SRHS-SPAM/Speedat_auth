import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordEmail(to: string, temporaryPassword: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Password Reset',
      template: 'reset-password',
      context: {
        temporaryPassword,
      },
    });
  }
}