import { ApiProperty } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  role: ERole

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  password: string
}
