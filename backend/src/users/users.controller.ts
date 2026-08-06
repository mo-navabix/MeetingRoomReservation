import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @Get()
  async findAll() {
    return await this.userservice.findAll();
  }
}
