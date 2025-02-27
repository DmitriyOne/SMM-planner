import { ApiProperty } from '@nestjs/swagger'
import { TAG_REMOVED_SUCCESS_MSG } from 'src/constants/tag.constant'

export class DeleteTagResponseDto {
  @ApiProperty({ example: TAG_REMOVED_SUCCESS_MSG(1) })
  message: string
}
