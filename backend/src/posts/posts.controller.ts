import { Controller, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, NotFoundException } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { FindPostsDto } from './dto/find-posts.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PostEntity } from './entities/post.entity'
import { DeletePostResponseDto } from './dto/delete-post-response.dto.ts'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { POST_DELETED_SUCCESS_MSG, POST_NOT_FOUND_BY_ID_MSG } from 'src/constants/post.constant'

@Controller(PREFIX.POSTS)
@ApiTags(capitalizeFirstLetter(PREFIX.POSTS))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll(@Body() findPostsDto: FindPostsDto) {
    return this.postsService.findAll(findPostsDto)
  }

  @Post(PREFIX.CREATE)
  @ApiOkResponse({ type: CreatePostDto })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @HttpCode(200)
  @Post(PREFIX.ID)
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id)

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    return post
  }

  @Patch(PREFIX.ID)
  @ApiOkResponse({ type: PostEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postsService.update(id, updatePostDto)

    if (!updatedPost) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    return updatedPost
  }

  @Delete(PREFIX.ID)
  @ApiOkResponse({ type: DeletePostResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeletePostResponseDto> {
    const deletedPost = await this.postsService.remove(id)

    if (!deletedPost) {
      throw new NotFoundException(POST_NOT_FOUND_BY_ID_MSG(id))
    }

    return { message: POST_DELETED_SUCCESS_MSG(id) }
  }
}
