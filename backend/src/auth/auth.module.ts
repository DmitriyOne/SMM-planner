import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTOptions } from '../common/configs/jwt.config'
import { BasicStrategy } from './strategy/basic.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BasicStrategy, JwtStrategy],
})
export class AuthModule {}
