import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),

      port: this.configService.get<number>('MAIL_PORT'),

      secure: this.configService.get<boolean>('MAIL_SECURE'),

      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendOtp(email: string, otp: string) {
    return this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to: emil,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      `,
    });
  }
}
