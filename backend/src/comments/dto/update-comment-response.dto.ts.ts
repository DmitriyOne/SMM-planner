import { ApiProperty } from '@nestjs/swagger'
import { COMMENT_UPDATED_SUCCESS_MSG } from '../../constants/comment.constant'

export class UpdateCommentResponseDto {
  @ApiProperty({ example: COMMENT_UPDATED_SUCCESS_MSG(1) })
  message: string
}
