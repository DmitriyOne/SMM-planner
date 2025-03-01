import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { commentsMock } from 'mocks'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ nullable: false, minLength: 3, default: commentsMock[0].content })
  content: string
}
