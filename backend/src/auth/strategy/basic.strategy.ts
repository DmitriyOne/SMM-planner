import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from 'src/common/configs/env-schema.config'
import { BasicStrategy as Strategy } from 'passport-http'
import { GUARD_NAME } from 'src/constants/guard.constant'
import { AUTH_BASE_INVALID_DATA, AUTH_BASE_INVALID_MSG } from 'src/constants/auth.constant'

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, GUARD_NAME.BASIC) {
  private readonly logger = new Logger(BasicStrategy.name)

  constructor(private configService: ConfigService<EnvConfig>) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const validUsername = this.configService.get<string>('BASIC_USERNAME')
    const validPassword = this.configService.get<string>('BASIC_PASSWORD')

    if (username === validUsername && password === validPassword) {
      return {}
    }

    this.logger.warn(AUTH_BASE_INVALID_DATA(username, password))
    throw new UnauthorizedException(AUTH_BASE_INVALID_MSG)
  }
}
