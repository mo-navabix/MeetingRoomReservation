import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/authorization/guards/permission.guard';
import { Permissions } from 'src/authorization/decorators/permissions.decorator';
import { PERMISSIONS } from 'src/authorization/constants/permissions.constant';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions(PERMISSIONS.ROOM_CREATE)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions(PERMISSIONS.ROOM_VIEW)
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions(PERMISSIONS.ROOM_VIEW)
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions(PERMISSIONS.ROOM_UPDATE)
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PermissionGuard)
  @Permissions(PERMISSIONS.ROOM_DELETE)
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
