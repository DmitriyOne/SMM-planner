import { ApiProperty } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

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

  @Exclude()
  password: string
}
