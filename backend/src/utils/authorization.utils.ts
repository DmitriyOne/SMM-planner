import { UnauthorizedException } from '@nestjs/common'
import { AUTH_CANNOT_MODIFY_MSG } from 'src/constants/auth.constant'

export const checkOwnership = (entityOwnerId: string, currentUserId: string, entityName: string): void => {
  if (entityOwnerId !== currentUserId) {
    throw new UnauthorizedException(AUTH_CANNOT_MODIFY_MSG(entityName))
  }
}
