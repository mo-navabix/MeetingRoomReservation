import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { RegisterDto } from './dto/register.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from '../common/entities/decorators/current-user.decorator';
import { JwtPayload } from './types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @Post('check-email')
  checkemail(@Body() dto: CheckEmailDto) {
    return this.authservice.checkEmail(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authservice.register(dto);
  }

  @Post('verifyotp')
  verifyotp(@Body() dto: verifyOtpDto) {
    return this.authservice.verifyOtp(dto);
  }

  @Post('resendotp')
  resendotp(@Body() dto: CheckEmailDto) {
    return this.authservice.resendOtp(dto.email);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authservice.login(dto);
  }
}
