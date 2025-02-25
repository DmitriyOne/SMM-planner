import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { EnvConfig } from './env-schema.config'

export const getJWTOptions = async (configService: ConfigService<EnvConfig>): Promise<JwtModuleOptions> => {
  return {
    global: true,
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '1d' },
  }
}
