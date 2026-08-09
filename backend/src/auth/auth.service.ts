import { Injectable } from '@nestjs/common';
import { CheckEmailDto } from './dto/check-email.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UsersService) {}
  async checkEmail(dto: CheckEmailDto) {
    const user = await this.userservice.findByEmail(dto.email);

    if (user) {
      return {
        exists: true,
        action: 'login',
      };
    }
    return {
      exists: false,
      action: 'register',
    };
  }

  async register(dto: RegisterDto) {
    const existinguser = await this.userservice.findByEmail(dto.email);

    if (existinguser) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }

    return await this.userservice.create(
      dto.name,
      dto.family,
      dto.email,
      dto.password,
    );
  }
}
