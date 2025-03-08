import { ApiProperty } from '@nestjs/swagger'
import { USER_DELETED_SUCCESS_MSG } from '../../constants/user.constant'

export class DeleteUserResponseDto {
  @ApiProperty({ example: USER_DELETED_SUCCESS_MSG('1') })
  message: string
}
