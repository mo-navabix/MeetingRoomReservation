import { Injectable } from '@nestjs/common';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class AuthService {
  checkEmail(dto: CheckEmailDto) {
    return {
      email: dto.email,
      exist: false,
    };
  }
}
