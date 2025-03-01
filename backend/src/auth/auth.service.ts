import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { AuthLoginDto } from './dto/login.dto'
import { AuthEntity } from './entities/auth.entity'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from 'src/common/interfaces/jwt.interface'
import { AUTH_INVALID_PASSWORD_MSG, AUTH_NOT_FOUND_BY_EMAIL_MSG } from 'src/constants/auth.constant'
import { AuthRegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<AuthEntity> {
    const { name, email, password } = authRegisterDto

    await this.userService.validateUserEmailExists(email)

    const newUser = await this.userService.create({
      name,
      email,
      password,
    })

    const payload: IJwtPayload = { sub: newUser.id, email: newUser.email }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async login(authLoginDto: AuthLoginDto): Promise<AuthEntity> {
    const { email, password } = authLoginDto

    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException(AUTH_NOT_FOUND_BY_EMAIL_MSG(email))
    }

    const isPasswordValid = await this.userService.comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_INVALID_PASSWORD_MSG)
    }

    const payload: IJwtPayload = { sub: user.id, email: user.email }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
