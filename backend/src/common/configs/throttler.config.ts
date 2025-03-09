import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerOptionsFactory, ThrottlerModuleOptions } from '@nestjs/throttler'
import { EnvConfig } from './env-schema.config'

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService<EnvConfig>) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    const ttl = this.configService.get<number>('THROTTLE_TTL')
    const limit = this.configService.get<number>('THROTTLE_LIMIT')
    return {
      throttlers: [
        {
          ttl,
          limit,
        },
      ],
    }
  }
}
