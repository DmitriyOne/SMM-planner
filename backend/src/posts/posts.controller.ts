import { Controller, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Get, HttpStatus } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PREFIX } from '../constants/prefix.constant'
import { FindPostsDto } from './dto/find-posts.dto'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PostEntity } from './entities/post.entity'
import { DeletePostResponseDto } from './dto/delete-post-response.dto.ts'
import { capitalizeFirstLetter } from '../utils/string.utils'
import { POST_DELETED_SUCCESS_MSG, POST_UPDATE_SUCCESS_MSG } from '../constants/post.constant'
import { IsPublic } from '../common/decorators/is-public.decorator'
import { UpdatePostResponseDto } from './dto/update-post-response.dto'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { UserEntity } from '../users/entities/user.entity'
import { Roles } from '../common/decorators/roles.decorator'
import { checkOwnership } from '../utils/authorization.utils'
import { WHO_CAN_ACCESS_THIS_ENDPOINT } from '../constants/endpoint.constant'

@Controller(PREFIX.POSTS)
@ApiTags(capitalizeFirstLetter(PREFIX.POSTS))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Post(PREFIX.ALL)
  @IsPublic()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findAll(@Body() findPostsDto: FindPostsDto) {
    const allPosts = await this.postsService.findAll(findPostsDto)
    return allPosts.map((post) => new PostEntity(post))
  }

  @Post(PREFIX.CREATE)
  @Roles('super_admin', 'admin', 'editor')
  @ApiBearerAuth()
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT('super_admin', 'admin', 'editor') })
  @ApiOkResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() currentUser: UserEntity) {
    await this.postsService.validateUniqueTitle(createPostDto.title)
    const newPost = await this.postsService.create(createPostDto, currentUser.id)
    return new PostEntity(newPost)
  }

  @HttpCode(HttpStatus.OK)
  @Get(PREFIX.ID)
  @IsPublic()
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.validatePostExists(id)
    return new PostEntity(post)
  }

  @Patch(PREFIX.ID)
  @Roles('super_admin', 'admin', 'editor')
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT('super_admin', 'admin', 'editor') })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdatePostResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<UpdatePostResponseDto> {
    const post = await this.postsService.validatePostExists(id)
    checkOwnership(post.authorId, currentUser.id, 'post', currentUser.role)
    await this.postsService.validateUniqueTitle(updatePostDto.title)
    await this.postsService.update(id, updatePostDto)

    return { message: POST_UPDATE_SUCCESS_MSG(id) }
  }

  @Delete(PREFIX.ID)
  @Roles('super_admin', 'admin', 'editor')
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT('super_admin', 'admin', 'editor') })
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeletePostResponseDto })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeletePostResponseDto> {
    const post = await this.postsService.validatePostExists(id)
    checkOwnership(post.authorId, currentUser.id, 'post', currentUser.role)
    await this.postsService.remove(id)
    return { message: POST_DELETED_SUCCESS_MSG(id) }
  }
}
