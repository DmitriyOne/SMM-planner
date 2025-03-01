import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator'
import { CreateTagDto } from 'src/tags/dto/create-tag.dto'

type TCreatePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

export class CreatePostDto implements TCreatePost {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ default: 'Lorem ipsum' })
  title: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  description: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    required: false,
    default: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739974186/samples/balloons.jpg',
  })
  image: string | null

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isPublish: boolean

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  isApproved: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, format: 'uuid', default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  authorId: string | null

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  @IsOptional()
  @ApiProperty({ required: false, type: [CreateTagDto], nullable: true, default: [] })
  tags?: CreateTagDto[]
}
