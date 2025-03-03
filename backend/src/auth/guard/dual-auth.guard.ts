import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common'
import { BasicAuthGuard } from './basic-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { firstValueFrom, isObservable } from 'rxjs'
import {
  AUTH_BASIC_AUTHENTICATION_REQUIRED_MSG,
  AUTH_BASIC_HEADER_NAME,
  AUTH_BEARER_HEADER_NAME,
  AUTH_HEADERS_AUTHENTICATION_MISSING_MSG,
  AUTH_HEADERS_NAME,
  AUTH_JWT_AUTHENTICATION_REQUIRED_MSG,
} from 'src/constants/auth.constant'

@Injectable()
export class DualAuthGuard implements CanActivate {
  constructor(
    private readonly basicAuthGuard: BasicAuthGuard,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorizationHeader = request.headers[AUTH_HEADERS_NAME]

    if (!authorizationHeader) {
      throw new UnauthorizedException(AUTH_HEADERS_AUTHENTICATION_MISSING_MSG)
    }

    const [basicToken, jwtToken] = this.extractTokens(authorizationHeader)

    if (basicToken) {
      request.headers[AUTH_HEADERS_NAME] = `${AUTH_BASIC_HEADER_NAME} ${basicToken}`
      await this.resolveGuard(this.basicAuthGuard, context)
    } else {
      throw new UnauthorizedException(AUTH_BASIC_AUTHENTICATION_REQUIRED_MSG)
    }

    if (jwtToken) {
      request.headers[AUTH_HEADERS_NAME] = `${AUTH_BEARER_HEADER_NAME} ${jwtToken}`
      return this.resolveGuard(this.jwtAuthGuard, context)
    } else {
      throw new UnauthorizedException(AUTH_JWT_AUTHENTICATION_REQUIRED_MSG)
    }
  }

  private extractTokens(authorizationHeader: string): [string | null, string | null] {
    const basicTokenMatch = authorizationHeader.match(/^Basic (.+)$/)
    const jwtTokenMatch = authorizationHeader.match(/^Bearer (.+)$/)

    return [basicTokenMatch ? basicTokenMatch[1] : null, jwtTokenMatch ? jwtTokenMatch[1] : null]
  }

  private async resolveGuard(guard: CanActivate, context: ExecutionContext): Promise<boolean> {
    const result = guard.canActivate(context)

    if (result instanceof Promise) {
      return await result
    }

    if (isObservable(result)) {
      return await firstValueFrom(result)
    }

    return result
  }
}
