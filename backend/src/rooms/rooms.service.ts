import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.roomRepository.findOne({
      where: { name: createRoomDto.name },
    });

    if (existingRoom) {
      throw new BadRequestException('اتاقی با این نام از قبل وجود دارد');
    }

    const room = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({
      where: { isactive: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`اتاقی با شناسه ${id} یافت نشد`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    Object.assign(room, updateRoomDto);

    return await this.roomRepository.save(room);
  }

  async remove(id: number): Promise<{ message: string }> {
    const room = await this.findOne(id);
    await this.roomRepository.remove(room);
    return { message: `اتاق شماره ${id} با موفقیت حذف شد` };
  }
}
