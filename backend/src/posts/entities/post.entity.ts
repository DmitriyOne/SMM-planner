import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'
import { UserEntity } from 'src/users/entities/user.entity'

export class PostEntity implements Post {
  constructor({ author, ...data }: Partial<PostEntity>) {
    Object.assign(this, data)

    if (author) {
      this.author = new UserEntity(author)
    }
  }

  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty({ required: false, nullable: true })
  image: string

  @ApiProperty()
  isPublish: boolean

  @ApiProperty({ required: false, nullable: true })
  isApproved: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, nullable: true })
  authorId: string

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity
}
