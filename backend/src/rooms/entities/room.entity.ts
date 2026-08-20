import { extend } from 'joi';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ nullable: true })
  location: string;

  @Column('simple-array', { nullable: true })
  fasilitise: string[];

  @Column({ default: true })
  isactive: boolean;
}
