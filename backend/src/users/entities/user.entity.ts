import { ApiProperty } from '@nestjs/swagger'
import { ERole, User } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { postsSeedData, tagsSeedData, usersSeedData } from 'prisma/seed'
import { PostEntity } from 'src/posts/entities/post.entity'
import { TagEntity } from 'src/tags/entities/tag.entity'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty({ default: 'b480db78-d9c2-47bf-ber8-3be8ae3qd16n' })
  id: string

  @ApiProperty({ default: usersSeedData[0].name })
  name: string

  @ApiProperty({ default: usersSeedData[0].email })
  email: string

  @ApiProperty({ enum: ERole, default: usersSeedData[0].role })
  role: ERole

  @ApiProperty({ default: new Date() })
  createdAt: Date

  @ApiProperty({ default: new Date() })
  updatedAt: Date

  @Exclude()
  password: string

  @ApiProperty({ required: false, type: [PostEntity], nullable: true, default: postsSeedData })
  posts?: PostEntity[]

  @ApiProperty({ required: false, type: [TagEntity], nullable: true, default: tagsSeedData })
  tags?: TagEntity[]
}
