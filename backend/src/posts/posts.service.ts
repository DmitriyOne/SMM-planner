import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { FindPostsDto } from './dto/find-posts.dto'

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  findAll(findPostsDto: FindPostsDto) {
    if (!findPostsDto || Object.keys(findPostsDto).length === 0) {
      return this.prismaService.post.findMany()
    }

    return this.prismaService.post.findMany({
      where: {
        AND: [
          findPostsDto.isPublish !== null && findPostsDto.isPublish !== undefined
            ? { isPublish: findPostsDto.isPublish }
            : {},
          findPostsDto.isApproved !== null && findPostsDto.isApproved !== undefined
            ? { isApproved: findPostsDto.isApproved }
            : {},
        ],
      },
    })
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({ where: { id } })
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post'
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
