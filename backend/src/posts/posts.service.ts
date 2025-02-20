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

  create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create({ data: createPostDto })
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({ where: { id } })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    })
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } })
  }
}
