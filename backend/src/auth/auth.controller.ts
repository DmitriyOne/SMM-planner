import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PREFIX } from '../constants/prefix.constant'
import { AuthLoginDto } from './dto/login.dto'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { capitalizeFirstLetter } from '../utils/string.utils'
import { AuthEntity } from './entities/auth.entity'
import { IsPublic } from '../common/decorators/is-public.decorator'
import { AUTH_FAILED_MSG } from '../constants/auth.constant'
import { AuthRegisterDto } from './dto/register.dto'
import { Throttle } from '@nestjs/throttler'
import { BasicAuthGuard } from './guard/basic-auth.guard'
import { PRIVATE_ENDPOINT_WITH_BASIC_AUTH } from '../constants/endpoint.constant'

@Controller(PREFIX.AUTH)
@ApiTags(capitalizeFirstLetter(PREFIX.AUTH))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(PREFIX.REGISTER)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @IsPublic()
  @ApiOperation({ summary: PRIVATE_ENDPOINT_WITH_BASIC_AUTH })
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() authRegisterDto: AuthRegisterDto): Promise<AuthEntity> {
    const token = await this.authService.register(authRegisterDto)

    if (!token.accessToken) {
      throw new UnauthorizedException(AUTH_FAILED_MSG)
    }

    return token
  }

  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(PREFIX.LOGIN)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @IsPublic()
  @ApiOperation({ summary: PRIVATE_ENDPOINT_WITH_BASIC_AUTH })
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<AuthEntity> {
    const token = await this.authService.login(authLoginDto)

    if (!token.accessToken) {
      throw new UnauthorizedException(AUTH_FAILED_MSG)
    }

    return token
  }
}
