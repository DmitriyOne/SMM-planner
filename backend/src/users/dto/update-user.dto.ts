import { ApiProperty, PartialType } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { AuthRegisterDto } from '../../auth/dto/register.dto'

export class UpdateUserDto extends PartialType(AuthRegisterDto) {}

export class UpdateUserRoleDto implements Pick<User, 'role'> {
  @IsEnum(ERole)
  @IsNotEmpty()
  @ApiProperty({ enum: ERole, default: ERole.reader })
  role: ERole
}
