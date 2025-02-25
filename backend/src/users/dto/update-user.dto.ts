import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { ERole } from '@prisma/client'
import { IsEnum, IsNotEmpty } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserRoleDto implements Pick<CreateUserDto, 'role'> {
  @IsEnum(ERole)
  @IsNotEmpty()
  @ApiProperty()
  role: ERole
}
