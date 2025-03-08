import { ApiProperty } from '@nestjs/swagger'
import { TAG_UPDATED_SUCCESS_MSG } from '../../constants/tag.constant'

export class UpdateTagResponseDto {
  @ApiProperty({ example: TAG_UPDATED_SUCCESS_MSG(1) })
  message: string
}
