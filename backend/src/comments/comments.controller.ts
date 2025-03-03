import { Controller, Post, Body, Patch, Param, Delete, ParseIntPipe, Get } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CommentEntity } from './entities/comment.entity'
import { UpdateCommentResponseDto } from './dto/update-comment-response.dto.ts'
import { DeleteCommentResponseDto } from './dto/delete-comment-response.dto.ts'
import { COMMENT_REMOVED_SUCCESS_MSG, COMMENT_UPDATED_SUCCESS_MSG } from 'src/constants/comment.constant'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { UserEntity } from 'src/users/entities/user.entity'
import { PostsService } from 'src/posts/posts.service'
import { checkOwnership } from 'src/utils/authorization.utils'

@Controller(PREFIX.COMMENTS)
@ApiTags(capitalizeFirstLetter(PREFIX.COMMENTS))
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Get(`${PREFIX.POST_ID}/${PREFIX.ALL}`)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity, isArray: true })
  async findAll(@Param('postId', ParseIntPipe) id: number) {
    await this.postsService.validatePostExists(id)
    const comments = await this.commentsService.findCommentsByPostId(id)
    return comments
  }

  @Post(`${PREFIX.POST_ID}/${PREFIX.CREATE}`)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentEntity })
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    await this.postsService.validatePostExists(postId)
    return this.commentsService.create(createCommentDto, postId, currentUser.id)
  }

  @Patch(`${PREFIX.POST_ID}/${PREFIX.ID}`)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateCommentResponseDto })
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<UpdateCommentResponseDto> {
    const tag = await this.postsService.validatePostExists(postId)
    checkOwnership(tag.authorId, currentUser.id, 'comment')
    await this.commentsService.update(id, updateCommentDto)
    return { message: COMMENT_UPDATED_SUCCESS_MSG(id) }
  }

  @Delete(`${PREFIX.POST_ID}/${PREFIX.ID}`)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteCommentResponseDto })
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeleteCommentResponseDto> {
    const tag = await this.postsService.validatePostExists(postId)
    checkOwnership(tag.authorId, currentUser.id, 'comment')
    await this.commentsService.remove(id)
    return { message: COMMENT_REMOVED_SUCCESS_MSG(id) }
  }
}
