import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'
import { postsMock, usersMock, tagsMock } from 'mocks'
import { TagEntity } from 'src/tags/entities/tag.entity'
import { UserEntity } from 'src/users/entities/user.entity'

export class PostEntity implements Post {
  constructor({ author, ...data }: Partial<PostEntity>) {
    Object.assign(this, data)

    if (author) {
      this.author = new UserEntity(author)
    }
  }

  @ApiProperty({ default: '1' })
  id: number

  @ApiProperty({ default: postsMock[0].title })
  title: string

  @ApiProperty({ default: postsMock[0].description })
  description: string

  @ApiProperty({ required: false, nullable: true, default: postsMock[0].image })
  image: string

  @ApiProperty({ default: false })
  isPublish: boolean

  @ApiProperty({ required: false, nullable: true, default: false })
  isApproved: boolean

  @ApiProperty({ default: new Date() })
  createdAt: Date

  @ApiProperty({ default: new Date() })
  updatedAt: Date

  @ApiProperty({ required: false, nullable: true, default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  authorId: string

  @ApiProperty({ required: false, type: UserEntity, nullable: true, default: usersMock[0] })
  author?: UserEntity

  @ApiProperty({ required: false, type: [TagEntity], nullable: true, default: tagsMock })
  tags?: TagEntity[]
}
