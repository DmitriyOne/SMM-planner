import { ApiProperty } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

type TCreateUser = Pick<User, 'name' | 'email' | 'password' | 'role'>

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

  @IsEnum(ERole)
  @IsNotEmpty()
  @ApiProperty()
  role: ERole
}
