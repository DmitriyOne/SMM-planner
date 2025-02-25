import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IJwtPayload } from 'src/common/interfaces/jwt.interface'
import { UsersService } from 'src/users/users.service'
import { UserEntity } from 'src/users/entities/user.entity'
import { plainToClass } from 'class-transformer'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: IJwtPayload): Promise<UserEntity | null> {
    const currentUser = await this.usersService.findOne(payload.email)
    const userWithoutPassword = plainToClass(UserEntity, currentUser)
    return userWithoutPassword
  }
}
