import { ApiProperty } from '@nestjs/swagger'
import { Tag } from '@prisma/client'
import { postsSeedData, tagsSeedData, usersSeedData } from 'prisma/seed'
import { PostEntity } from 'src/posts/entities/post.entity'
import { UserEntity } from 'src/users/entities/user.entity'

export class TagEntity implements Tag {
  @ApiProperty({ nullable: false, default: 1 })
  id: number

  @ApiProperty({ nullable: false, default: tagsSeedData[0].title })
  title: string

  @ApiProperty({ nullable: false, default: new Date() })
  createdAt: Date

  @ApiProperty({ nullable: false, default: new Date() })
  updatedAt: Date

  @ApiProperty({ required: false, nullable: true, default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  authorId: string | null

  @ApiProperty({ required: false, type: UserEntity, nullable: true, default: usersSeedData[0] })
  author?: UserEntity

  @ApiProperty({ required: false, type: [PostEntity], nullable: true, default: [postsSeedData[0]] })
  posts?: PostEntity[]
}
