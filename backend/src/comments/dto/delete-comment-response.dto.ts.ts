import { ApiProperty } from '@nestjs/swagger'
import { COMMENT_REMOVED_SUCCESS_MSG } from 'src/constants/comment.constant'

export class DeleteCommentResponseDto {
  @ApiProperty({ example: COMMENT_REMOVED_SUCCESS_MSG(1) })
  message: string
}
