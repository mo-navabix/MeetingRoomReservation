import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('check-email')
  checkemail(@Body() dto: CheckEmailDto) {
    return this.authservice.checkEmail(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authservice.register(dto);
  }
}
