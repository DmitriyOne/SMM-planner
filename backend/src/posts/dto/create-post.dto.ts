import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'

type TCreatePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

export class CreatePostDto implements TCreatePost {
  @ApiProperty({ default: 'Lorem ipsum' })
  title: string

  @ApiProperty({
    default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  description: string

  @ApiProperty({
    required: false,
    default: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739974186/samples/balloons.jpg',
  })
  image: string | null

  @ApiProperty({ default: false })
  isPublish: boolean

  @ApiProperty({ default: false })
  isApproved: boolean
}
