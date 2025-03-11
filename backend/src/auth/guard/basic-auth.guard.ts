import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  AUTH_BASE_INVALID_MSG,
  AUTH_BASE_WWW_HEADER_NAME,
  AUTH_BASE_WWW_HEADER_VALUE,
} from 'src/constants/auth.constant'
import { GUARD_NAME } from 'src/constants/guard.constant'

@Injectable()
export class BasicAuthGuard extends AuthGuard(GUARD_NAME.BASIC) {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      const response = context.switchToHttp().getResponse()
      if (response) {
        response.setHeader(AUTH_BASE_WWW_HEADER_NAME, AUTH_BASE_WWW_HEADER_VALUE)
      }
      throw new UnauthorizedException(AUTH_BASE_INVALID_MSG)
    }
    return user
  }
}
