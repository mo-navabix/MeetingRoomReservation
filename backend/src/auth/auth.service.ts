import { Injectable } from '@nestjs/common';
import { CheckEmailDto } from './dto/check-email.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UsersService) {}
  checkEmail(dto: CheckEmailDto) {
    return this.userservice.findByEmail(dto.email);
  }
}
