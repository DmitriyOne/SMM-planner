import { ApiProperty } from '@nestjs/swagger'
import { Tag } from '@prisma/client'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

type TCreateTag = Omit<Tag, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>

export class CreateTagDto implements TCreateTag {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ default: 'Tech' })
  title: string
}
