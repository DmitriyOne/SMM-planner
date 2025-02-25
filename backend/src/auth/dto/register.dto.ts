import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

type TRegisterUser = Pick<User, 'name' | 'email' | 'password'>

export class AuthRegisterDto implements TRegisterUser {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string
}
