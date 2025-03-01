import { ApiProperty } from '@nestjs/swagger'
import { POST_DELETED_SUCCESS_MSG } from 'src/constants/post.constant'

export class DeletePostResponseDto {
  @ApiProperty({ example: POST_DELETED_SUCCESS_MSG(1) })
  message: string
}
