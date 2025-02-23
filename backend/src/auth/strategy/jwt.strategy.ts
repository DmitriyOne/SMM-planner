import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IJwtPayload, IJwtValidateResponse } from 'src/common/interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: IJwtPayload): Promise<IJwtValidateResponse> {
    return { userId: payload.sub, email: payload.email }
  }
}
