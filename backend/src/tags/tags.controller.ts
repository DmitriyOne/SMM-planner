import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { TAG_REMOVED_SUCCESS_MSG, TAG_UPDATED_SUCCESS_MSG } from 'src/constants/tag.constant'
import { TagEntity } from './entities/tag.entity'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeleteTagResponseDto } from './dto/delete-tag-response.dto.ts'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { UpdateTagResponseDto } from './dto/update-tag-response.dto'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { UserEntity } from 'src/users/entities/user.entity'
import { Roles } from 'src/common/decorators/roles.decorator'
import { checkOwnership } from 'src/utils/authorization.utils'

@Controller(PREFIX.TAGS)
@ApiTags(capitalizeFirstLetter(PREFIX.TAGS))
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get(PREFIX.ALL)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TagEntity, isArray: true })
  findAll() {
    return this.tagsService.findAll()
  }

  @Get(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TagEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tag = await this.tagsService.validateTagExists(id)
    return tag
  }

  @Post(PREFIX.CREATE)
  @Roles('admin', 'editor')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTagDto })
  async create(@Body() createTagDto: CreateTagDto, @CurrentUser() currentUser: UserEntity) {
    await this.tagsService.validateUniqueTitle(createTagDto.title)
    return this.tagsService.create(createTagDto, currentUser.id)
  }

  @Patch(PREFIX.ID)
  @Roles('admin', 'editor')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateTagResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<UpdateTagResponseDto> {
    const tag = await this.tagsService.validateTagExists(id)
    checkOwnership(tag.authorId, currentUser.id, 'tag')
    await this.tagsService.validateUniqueTitle(updateTagDto.title)
    await this.tagsService.update(id, updateTagDto)

    return { message: TAG_UPDATED_SUCCESS_MSG(id) }
  }

  @Delete(PREFIX.ID)
  @Roles('admin', 'editor')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteTagResponseDto })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeleteTagResponseDto> {
    const tag = await this.tagsService.validateTagExists(id)
    checkOwnership(tag.authorId, currentUser.id, 'tag')
    await this.tagsService.remove(id)
    return { message: TAG_REMOVED_SUCCESS_MSG(id) }
  }
}
