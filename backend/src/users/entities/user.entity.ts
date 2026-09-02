import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../authorization/entities/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  family: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  otp: string | null;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiredAt: Date | null;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
