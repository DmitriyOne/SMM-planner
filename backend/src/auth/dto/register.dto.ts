import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { usersMock } from 'mocks'
import {
  AUTH_PASSWORD_LATIN_ALPHABET_REGEX,
  AUTH_PASSWORD_NOT_LATIN_ALPHABET_MSG,
  AUTH_PASSWORD_NOT_TWO_DIGITS_MSG,
  AUTH_PASSWORD_NOT_TWO_UPPERCASE_LETTERS_MSG,
  AUTH_PASSWORD_TWO_DIGITS_REGEX,
  AUTH_PASSWORD_TWO_UPPERCASE_LETTERS_REGEX,
} from '../../constants/auth.constant'

type TRegisterUser = Pick<User, 'name' | 'email' | 'password'>

export class AuthRegisterDto implements TRegisterUser {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ required: true, maxLength: 3, nullable: false, default: usersMock[0].name })
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false, default: usersMock[0].email })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(AUTH_PASSWORD_LATIN_ALPHABET_REGEX, { message: AUTH_PASSWORD_NOT_LATIN_ALPHABET_MSG })
  @Matches(AUTH_PASSWORD_TWO_UPPERCASE_LETTERS_REGEX, { message: AUTH_PASSWORD_NOT_TWO_UPPERCASE_LETTERS_MSG })
  @Matches(AUTH_PASSWORD_TWO_DIGITS_REGEX, { message: AUTH_PASSWORD_NOT_TWO_DIGITS_MSG })
  @ApiProperty({ required: true, minLength: 6, nullable: false, default: usersMock[0].password })
  password: string
}
