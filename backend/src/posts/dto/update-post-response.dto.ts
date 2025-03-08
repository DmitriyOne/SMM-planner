import { ApiProperty } from '@nestjs/swagger'
import { POST_UPDATE_SUCCESS_MSG } from '../../constants/post.constant'

export class UpdatePostResponseDto {
  @ApiProperty({ example: POST_UPDATE_SUCCESS_MSG(1) })
  message: string
}
