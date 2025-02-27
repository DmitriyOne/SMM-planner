import { ApiProperty } from '@nestjs/swagger'
import { AUTH_FAKE_JWT_TOKEN } from 'src/constants/auth.constant'

export class AuthEntity {
  @ApiProperty({ nullable: false, default: AUTH_FAKE_JWT_TOKEN })
  accessToken: string
}
