import { Controller, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { FindPostsDto } from './dto/find-posts.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PostEntity } from './entities/post.entity'
import { DeletePostResponseDto } from './dto/delete-post-response.dto.ts'
import { capitalizeFirstLetter } from 'src/utils/string.utils'

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
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(PREFIX.ID)
  @ApiOkResponse({ type: PostEntity })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete(PREFIX.ID)
  @ApiOkResponse({ type: DeletePostResponseDto })
  async remove(@Param('id') id: string): Promise<DeletePostResponseDto> {
    const deletedPost = await this.postsService.remove(+id)

    return { message: `Post ${deletedPost.id} was deleted` }
  }
}
