import { Injectable } from '@nestjs/common';
import { CheckEmailDto } from './dto/check-email.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { BadRequestException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private readonly mailservice: MailService,
    private readonly jwtservice: JwtService,
  ) {}
  async checkEmail(dto: CheckEmailDto) {
    const user = await this.userservice.findByEmail(dto.email);

    if (!user) {
      return {
        exists: false,
        action: 'register',
      };
    }

    if (!user.isEmailVerified) {
      return {
        exists: true,
        action: 'verify-email',
      };
    }

    return {
      exists: true,
      action: 'login',
    };
  }

  private generateOtp(): string {
    return randomInt(100000, 1000000).toString();
  }

  async register(dto: RegisterDto) {
    const existinguser = await this.userservice.findByEmail(dto.email);

    if (existinguser) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }

    const hashedpassword = await bcrypt.hash(dto.password, 10);
    const otp = this.generateOtp();
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.userservice.create(
      dto.name,
      dto.family,
      dto.email,
      hashedpassword,
      otp,
      otpExpiredAt,
    );

    await this.mailservice.sendOtp(dto.email, otp);

    return {
      succss: true,
      message:
        'User registered successfully. Please check your email for the OTP.',
    };
  }

  async verifyOtp(dto: verifyOtpDto) {
    const user = await this.userservice.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (!user.otpExpiredAt || user.otpExpiredAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiredAt = null;

    await this.userservice.save(user);

    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

  async resendOtp(email: string) {
    const user = await this.userservice.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const otp = this.generateOtp();
    const otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiredAt = otpExpiredAt;
    await this.userservice.save(user);
    // await this.mailservice.sendOtp(email, otp);
    console.log(`\n================================`);
    console.log(`Generated OTP for ${user.email}: ${otp}`);
    console.log(`================================\n`);

    return {
      success: true,
      message: 'OTP resent successfully',
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userservice.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.isEmailVerified) {
      throw new BadRequestException('Email not verified');
    }

    const ispasswordvalid = bcrypt.compare(dto.password, user.password);

    if (!ispasswordvalid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtservice.signAsync(payload);

    return {
      success: true,
      accessToken,
    };
  }
}
