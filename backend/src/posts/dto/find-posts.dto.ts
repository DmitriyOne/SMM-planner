import { ApiProperty } from '@nestjs/swagger'

export class FindPostsDto {
  @ApiProperty({ required: false, default: false })
  isPublish?: boolean = false

  @ApiProperty({ required: false, default: false })
  isApproved?: boolean = false
}
