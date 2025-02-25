import { ApiProperty } from '@nestjs/swagger'
import { USER_UPDATE_ROLE_SUCCESS_MSG } from 'src/constants/user.constant'

export class UpdateUserResponseDto {
  @ApiProperty({ example: USER_UPDATE_ROLE_SUCCESS_MSG('John Doe', 'ADMIN') })
  message: string
}
