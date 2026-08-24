import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import {
  ALL_PERMISSIONS,
  PermissionName,
} from './constants/permissions.constant';
import { ROLES, RoleName } from './constants/roles.constant';

const ROLE_PERMISSIONS: Record<RoleName, PermissionName[]> = {
  [ROLES.ADMIN]: ALL_PERMISSIONS,
  [ROLES.USER]: [
    'room:view',
    'reservation:create',
  ],
  [ROLES.ROOM_MANAGER]: [
    'room:view',
    'room:create',
    'room:update',
  ],
};

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        roles: {
          permissions: true,
        },
      },
    });

    if (!user) {
      return [];
    }

    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name),
    );

    return [...new Set(permissions)];
  }

  async userHasPermissions(
    userId: number,
    requiredPermissions: string[],
  ): Promise<boolean> {
    if (requiredPermissions.length === 0) {
      return true;
    }

    const userPermissions = await this.getUserPermissions(userId);

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }

  async assignDefaultRoleToUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { roles: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.roles.length > 0) {
      return;
    }

    const defaultRole = await this.roleRepository.findOne({
      where: { name: ROLES.USER },
    });

    if (!defaultRole) {
      throw new InternalServerErrorException(
        'Default USER role is not configured. Run seed:rbac first.',
      );
    }

    user.roles = [defaultRole];
    await this.userRepository.save(user);
  }

  async seedRbac(): Promise<void> {
    const permissions = await Promise.all(
      ALL_PERMISSIONS.map(async (name) => {
        const existing = await this.permissionRepository.findOne({
          where: { name },
        });

        if (existing) {
          return existing;
        }

        return this.permissionRepository.save(
          this.permissionRepository.create({ name }),
        );
      }),
    );

    const permissionByName = new Map(
      permissions.map((permission) => [permission.name, permission]),
    );

    for (const [roleName, permissionNames] of Object.entries(
      ROLE_PERMISSIONS,
    ) as [RoleName, PermissionName[]][]) {
      let role = await this.roleRepository.findOne({
        where: { name: roleName },
        relations: { permissions: true },
      });

      if (!role) {
        role = this.roleRepository.create({
          name: roleName,
          permissions: permissionNames.map(
            (name) => permissionByName.get(name)!,
          ),
        });
      } else {
        role.permissions = permissionNames.map(
          (name) => permissionByName.get(name)!,
        );
      }

      await this.roleRepository.save(role);
    }
  }
}
