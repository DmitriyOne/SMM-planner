import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  NotFoundException,
  Get,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { FindPostsDto } from './dto/find-posts.dto'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PostEntity } from './entities/post.entity'
import { DeletePostResponseDto } from './dto/delete-post-response.dto.ts'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import {
  POST_DELETED_SUCCESS_MSG,
  POST_NOT_FOUND_BY_ID_MSG,
  POST_UPDATE_SUCCESS_MSG,
} from 'src/constants/post.constant'
import { IsPublic } from 'src/common/decorators/is-public.decorator'
import { UpdatePostResponseDto } from './dto/update-post-response.dto'

@Controller(PREFIX.POSTS)
@ApiTags(capitalizeFirstLetter(PREFIX.POSTS))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(200)
  @Post(PREFIX.ALL)
  @IsPublic()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findAll(@Body() findPostsDto: FindPostsDto) {
    const allPosts = await this.postsService.findAll(findPostsDto)
    return allPosts.map((post) => new PostEntity(post))
  }

  @Post(PREFIX.CREATE)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postsService.create(createPostDto)
    return new PostEntity(newPost)
  }

  @HttpCode(200)
  @Get(PREFIX.ID)
  @IsPublic()
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id)

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    return new PostEntity(post)
  }

  @Patch(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdatePostResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostResponseDto> {
    const updatedPost = await this.postsService.update(id, updatePostDto)

    if (!updatedPost) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    return { message: POST_UPDATE_SUCCESS_MSG(id) }
  }

  @Delete(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeletePostResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeletePostResponseDto> {
    const deletedPost = await this.postsService.findOne(id)

    if (!deletedPost) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    await this.postsService.remove(id)

    return { message: POST_DELETED_SUCCESS_MSG(id) }
  }
}
