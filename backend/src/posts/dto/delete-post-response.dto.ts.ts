import { ApiProperty } from '@nestjs/swagger'

export class DeletePostResponseDto {
  @ApiProperty({ example: 'Post 1 was deleted' })
  message: string
}
