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
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTagDto })
  async create(@Body() createTagDto: CreateTagDto) {
    await this.tagsService.validateUniqueTitle(createTagDto.title)
    return this.tagsService.create(createTagDto)
  }

  @Patch(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateTagResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateTagResponseDto> {
    await this.tagsService.validateTagExists(id)
    await this.tagsService.validateUniqueTitle(updateTagDto.title)
    await this.tagsService.update(id, updateTagDto)

    return { message: TAG_UPDATED_SUCCESS_MSG(id) }
  }

  @Delete(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteTagResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteTagResponseDto> {
    await this.tagsService.validateTagExists(id)
    await this.tagsService.remove(id)
    return { message: TAG_REMOVED_SUCCESS_MSG(id) }
  }
}
