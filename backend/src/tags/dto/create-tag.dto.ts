import { ApiProperty } from '@nestjs/swagger'
import { Tag } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

type TCreateTag = Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>

export class CreateTagDto implements TCreateTag {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ nullable: false, minLength: 3, default: 'Tech' })
  title: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, format: 'uuid', default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  authorId: string | null
}
