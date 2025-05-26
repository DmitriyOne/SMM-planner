import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from '../prisma/prisma.service'
import { FindPostsDto } from './dto/find-posts.dto'
import { isValidArray } from '../utils/array.utils'
import { PostEntity } from './entities/post.entity'
import { POST_ALREADY_EXISTS_MSG, POST_NOT_FOUND_BY_ID_MSG } from '../constants/post.constant'

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  findAll(findPostsDto: FindPostsDto) {
    if (!findPostsDto || Object.keys(findPostsDto).length === 0) {
      return this.prismaService.post.findMany({
        include: { tags: true, author: true },
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
      include: { tags: true, author: true },
    })
  }

  findByTagId(tagId: number) {
    return this.prismaService.post.findMany({
      where: { tags: { some: { id: tagId } } },
      include: { tags: true, author: true },
    })
  }

  create(createPostDto: CreatePostDto, authorId: string) {
    const { tags, ...createPost } = createPostDto

    return this.prismaService.post.create({
      data: {
        ...createPost,
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(isValidArray(tags) && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { title: tag.title },
              create: {
                title: tag.title,
                ...(authorId && { authorId }),
              },
            })),
          },
        }),
      },
      include: { tags: true },
    })
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
      include: { tags: true, author: true },
    })
  }

  findOneByTitle(title: string) {
    return this.prismaService.post.findUnique({ where: { title } })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const { tags, ...updatePost } = updatePostDto

    return this.prismaService.post.update({
      where: { id },
      data: {
        ...updatePost,
        ...(isValidArray(tags) && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { title: tag.title },
              create: { title: tag.title },
            })),
          },
        }),
        ...(Array.isArray(tags) &&
          tags.length === 0 && {
            tags: { set: [] },
          }),
      },
    })
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } })
  }

  async validatePostExists(id: number): Promise<PostEntity> {
    const post = await this.findOne(id)
    if (!post) throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    return post
  }

  async validateUniqueTitle(newTitle: string): Promise<void> {
    if (!newTitle) return
    const existingPost = await this.findOneByTitle(newTitle)
    if (existingPost && existingPost.title === newTitle) {
      throw new ConflictException(POST_ALREADY_EXISTS_MSG(newTitle))
    }
  }
}
