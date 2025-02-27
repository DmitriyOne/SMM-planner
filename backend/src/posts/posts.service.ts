import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { FindPostsDto } from './dto/find-posts.dto'
import { isValidArray } from 'src/utils/array.utils'

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  findAll(findPostsDto: FindPostsDto) {
    if (!findPostsDto || Object.keys(findPostsDto).length === 0) {
      return this.prismaService.post.findMany({
        include: { author: true, tags: true },
      })
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
      include: { author: true, tags: true },
    })
  }

  create(createPostDto: CreatePostDto) {
    const { tags, authorId, ...createPost } = createPostDto

    return this.prismaService.post.create({
      data: {
        ...createPost,
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(isValidArray(tags) && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { title: tag.title },
              create: { title: tag.title },
            })),
          },
        }),
      },
      include: { tags: true, author: true },
    })
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
      include: { author: true, tags: true },
    })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tags, authorId, ...updatePost } = updatePostDto

    return this.prismaService.post.update({
      where: { id },
      data: {
        ...updatePost,
        ...(isValidArray(tags) && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { title: tag.title },
              create: { title: tag.title },
            })),
          },
        }),
      },
    })
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } })
  }
}
