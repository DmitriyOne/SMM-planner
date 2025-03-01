import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IJwtPayload } from 'src/common/interfaces/jwt.interface'
import { UsersService } from 'src/users/users.service'
import { UserEntity } from 'src/users/entities/user.entity'
import { plainToClass } from 'class-transformer'
import { EnvConfig } from 'src/common/configs/env-schema.config'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService<EnvConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: IJwtPayload): Promise<UserEntity | null> {
    const currentUser = await this.usersService.findOneByEmail(payload.email)
    const userWithoutPassword = plainToClass(UserEntity, currentUser)
    return userWithoutPassword
  }
}
