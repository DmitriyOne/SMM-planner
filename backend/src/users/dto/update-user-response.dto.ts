import { ApiProperty } from '@nestjs/swagger'
import { USER_UPDATE_ROLE_SUCCESS_MSG, USER_UPDATED_SUCCESS_MSG } from 'src/constants/user.constant'

export class UpdateUserResponseDto {
  @ApiProperty({ example: USER_UPDATED_SUCCESS_MSG('John Doe') })
  message: string
}

export class UpdateUserRoleResponseDto {
  @ApiProperty({ example: USER_UPDATE_ROLE_SUCCESS_MSG('John Doe', 'ADMIN') })
  message: string
}
