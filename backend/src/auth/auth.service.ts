import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { AuthLoginDto } from './dto/login.dto'
import { AuthEntity } from './entities/auth.entity'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from 'src/common/interfaces/jwt.interface'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<AuthEntity> {
    const { email, password } = authLoginDto

    const user = await this.userService.findOne(email)

    if (!user) {
      throw new UnauthorizedException(`No user found for email: ${authLoginDto.email}`)
    }

    const isPasswordValid = user.password === password

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const payload: IJwtPayload = { sub: user.id, email: user.email }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
