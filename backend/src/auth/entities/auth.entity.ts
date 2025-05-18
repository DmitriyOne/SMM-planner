import { ApiProperty } from '@nestjs/swagger'
import { AUTH_FAKE_JWT_TOKEN } from '../../constants/auth.constant'

export class AuthEntity {
  @ApiProperty({ nullable: false, default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  id: string

  @ApiProperty({ nullable: false, default: AUTH_FAKE_JWT_TOKEN })
  accessToken: string
}
