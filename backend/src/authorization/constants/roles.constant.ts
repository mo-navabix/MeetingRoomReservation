export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  ROOM_MANAGER: 'ROOM_MANAGER',
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
