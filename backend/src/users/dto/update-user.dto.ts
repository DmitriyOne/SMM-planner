import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'
import { AuthRegisterDto } from '../../auth/dto/register.dto'
import { usersMock } from 'mocks'
import {
  AUTH_PASSWORD_LATIN_ALPHABET_REGEX,
  AUTH_PASSWORD_NOT_LATIN_ALPHABET_MSG,
  AUTH_PASSWORD_NOT_TWO_DIGITS_MSG,
  AUTH_PASSWORD_NOT_TWO_UPPERCASE_LETTERS_MSG,
  AUTH_PASSWORD_TWO_DIGITS_REGEX,
  AUTH_PASSWORD_TWO_UPPERCASE_LETTERS_REGEX,
} from 'src/constants/auth.constant'

export class UpdateUserDto extends PartialType(OmitType(AuthRegisterDto, ['password'])) {}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: true, minLength: 6, nullable: false, default: usersMock[0].password })
  oldPassword: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(AUTH_PASSWORD_LATIN_ALPHABET_REGEX, { message: AUTH_PASSWORD_NOT_LATIN_ALPHABET_MSG })
  @Matches(AUTH_PASSWORD_TWO_UPPERCASE_LETTERS_REGEX, { message: AUTH_PASSWORD_NOT_TWO_UPPERCASE_LETTERS_MSG })
  @Matches(AUTH_PASSWORD_TWO_DIGITS_REGEX, { message: AUTH_PASSWORD_NOT_TWO_DIGITS_MSG })
  @ApiProperty({ required: true, minLength: 6, nullable: false, default: 'QwertY123' })
  newPassword: string
}

export class UpdateUserRoleDto implements Pick<User, 'role'> {
  @IsEnum(ERole)
  @IsNotEmpty()
  @ApiProperty({ enum: ERole, default: ERole.reader })
  role: ERole
}
