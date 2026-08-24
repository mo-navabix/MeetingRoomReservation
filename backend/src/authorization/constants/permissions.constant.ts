export const PERMISSIONS = {
  ROOM_VIEW: 'room:view',
  ROOM_CREATE: 'room:create',
  ROOM_UPDATE: 'room:update',
  ROOM_DELETE: 'room:delete',
  RESERVATION_VIEW: 'reservation:view',
  RESERVATION_CREATE: 'reservation:create',
  RESERVATION_CANCEL: 'reservation:cancel',
} as const;

export type PermissionName =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS: PermissionName[] =
  Object.values(PERMISSIONS);
