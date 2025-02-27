import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

type TCreateUser = Pick<User, 'name' | 'email' | 'password'>

export class CreateUserDto implements TCreateUser {
  @IsString()
  @MinLength(3)
  @IsOptional()
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
