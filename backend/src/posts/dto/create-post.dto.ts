import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

type TCreatePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>

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
}
