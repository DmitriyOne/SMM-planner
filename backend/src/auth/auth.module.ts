import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTOptions } from 'src/common/configs/jwt.config'
import { BasicStrategy } from './strategy/basic.strategy'
import { DualAuthGuard } from './guard/dual-auth.guard'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { BasicAuthGuard } from './guard/basic-auth.guard'

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
  providers: [AuthService, BasicStrategy, JwtStrategy, BasicAuthGuard, JwtAuthGuard, DualAuthGuard],
  exports: [BasicAuthGuard, JwtAuthGuard, DualAuthGuard],
})
export class AuthModule {}
