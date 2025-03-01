import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PREFIX } from 'src/constants/prefix.constant'
import { AuthLoginDto } from './dto/login.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { AuthEntity } from './entities/auth.entity'
import { IsPublic } from 'src/common/decorators/is-public.decorator'
import { AUTH_FAILED_MSG } from 'src/constants/auth.constant'
import { AuthRegisterDto } from './dto/register.dto'

@Controller(PREFIX.AUTH)
@ApiTags(capitalizeFirstLetter(PREFIX.AUTH))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(PREFIX.REGISTER)
  @IsPublic()
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() authRegisterDto: AuthRegisterDto): Promise<AuthEntity> {
    const token = await this.authService.register(authRegisterDto)

    if (!token.accessToken) {
      throw new UnauthorizedException(AUTH_FAILED_MSG)
    }

    return token
  }

  @HttpCode(HttpStatus.OK)
  @Post(PREFIX.LOGIN)
  @IsPublic()
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<AuthEntity> {
    const token = await this.authService.login(authLoginDto)

    if (!token.accessToken) {
      throw new UnauthorizedException(AUTH_FAILED_MSG)
    }

    return token
  }
}
