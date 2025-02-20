import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class FindPostsDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isPublish?: boolean = false

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isApproved?: boolean = false
}
