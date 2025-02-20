import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserResponseDto {
  @ApiProperty({ example: 'User (#1) was deleted' })
  message: string
}
