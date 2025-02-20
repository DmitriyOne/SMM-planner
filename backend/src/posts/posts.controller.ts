import { Controller, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { FindPostsDto } from './dto/find-posts.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { PostEntity } from './entities/post.entity'

@Controller(PREFIX.POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(200)
  @ApiOkResponse({ type: PostEntity, isArray: true })
  @Post()
  findAll(@Body() findPostsDto: FindPostsDto) {
    return this.postsService.findAll(findPostsDto)
  }

  @Post(PREFIX.CREATE)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @HttpCode(200)
  @Post(PREFIX.ID)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(PREFIX.ID)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete(PREFIX.ID)
  async remove(@Param('id') id: string) {
    const deletedPost = await this.postsService.remove(+id)

    return `Post ${deletedPost.id} was deleted`
  }
}
