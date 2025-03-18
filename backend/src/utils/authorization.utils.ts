import { ForbiddenException } from '@nestjs/common'
import { AUTH_CANNOT_MODIFY_MSG } from '../constants/auth.constant'
import { ERole } from '@prisma/client'

export const checkOwnership = (entityOwnerId: string, currentUserId: string, entityName: string): void => {
  if (entityOwnerId !== currentUserId) {
    throw new ForbiddenException(AUTH_CANNOT_MODIFY_MSG(entityName))
  }
}

export const checkOwnerAndUserRole = (
  entityOwnerId: string,
  currentUserId: string,
  entityName: string,
  role: ERole,
): void => {
  if (role === ERole.admin) return

  if (entityOwnerId === currentUserId) return

  throw new ForbiddenException(AUTH_CANNOT_MODIFY_MSG(entityName))
}
