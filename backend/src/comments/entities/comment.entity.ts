import { ApiProperty } from '@nestjs/swagger'
import { Comment } from '@prisma/client'
import { commentsMock, usersMock } from 'mocks'
import { UserEntity } from 'src/users/entities/user.entity'

export class CommentEntity implements Comment {
  constructor({ author, ...data }: Partial<CommentEntity>) {
    Object.assign(this, data)

    if (author) {
      this.author = new UserEntity(author)
    }
  }

  @ApiProperty({ nullable: false, default: commentsMock[0].id })
  id: number

  @ApiProperty({ nullable: false, default: commentsMock[0].content })
  content: string

  @ApiProperty({ nullable: false, default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  authorId: string

  @ApiProperty({ required: false, type: UserEntity, nullable: true, default: usersMock[0] })
  author?: UserEntity

  @ApiProperty({ nullable: false, default: 432 })
  postId: number

  @ApiProperty({ nullable: false, default: new Date() })
  createdAt: Date

  @ApiProperty({ nullable: false, default: new Date() })
  updatedAt: Date
}
