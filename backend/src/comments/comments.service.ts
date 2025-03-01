import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CommentEntity } from './entities/comment.entity'
import { COMMENT_NOT_FOUND_BY_ID_MSG, COMMENT_USER_CANNOT_CHANGE_MSG } from 'src/constants/comment.constant'

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  findCommentsByPostId(postId: number) {
    return this.prismaService.comment.findMany({ where: { postId }, orderBy: { createdAt: 'asc' } })
  }

  create(createCommentDto: CreateCommentDto, postId: number, authorId: string) {
    return this.prismaService.comment.create({
      data: {
        content: createCommentDto.content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    })
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: { id },
      data: updateCommentDto,
    })
  }

  remove(id: number) {
    return this.prismaService.comment.delete({ where: { id } })
  }

  async validateCommentExists(postId: number, commentId: number): Promise<CommentEntity> {
    const comment = await this.prismaService.comment.findUnique({ where: { id: commentId, postId } })
    if (!comment) throw new NotFoundException(COMMENT_NOT_FOUND_BY_ID_MSG(commentId))
    return comment
  }

  async validateCurrentUserCommentExists(authorId: string, postId: number, commentId: number) {
    const comment = await this.validateCommentExists(postId, commentId)
    if (comment.authorId !== authorId) {
      throw new ForbiddenException(COMMENT_USER_CANNOT_CHANGE_MSG(commentId))
    }
  }
}
