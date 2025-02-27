import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { usersSeedData } from 'prisma/seed'

type TLoginUser = Pick<User, 'email' | 'password'>

export class AuthLoginDto implements TLoginUser {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false, default: usersSeedData[0].email })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: true, minLength: 6, nullable: false, default: usersSeedData[0].password })
  password: string
}
