import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ERole } from '@prisma/client'
import { ROLES_KEY } from 'src/common/decorators/roles.decorator'
import { AUTH_NOT_HAVE_RIGHTS_MSG } from 'src/constants/auth.constant'

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    const hasRequiredRole = requiredRoles.some((role) => user.role === role)

    if (!hasRequiredRole) {
      throw new ForbiddenException(AUTH_NOT_HAVE_RIGHTS_MSG)
    }

    return hasRequiredRole
  }
}
