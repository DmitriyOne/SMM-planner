import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PrismaService } from '../prisma/prisma.service'
import { TAG_ALREADY_EXISTS_MSG, TAG_NOT_FOUND_BY_ID_MSG } from '../constants/tag.constant'
import { TagEntity } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.tag.findMany({ include: { posts: true, author: true } })
  }

  findOneById(id: number) {
    return this.prismaService.tag.findUnique({ where: { id }, include: { posts: true, author: true } })
  }

  findOneByTitle(title: string) {
    return this.prismaService.tag.findUnique({ where: { title } })
  }

  create(createTagDto: CreateTagDto, authorId: string) {
    return this.prismaService.tag.create({
      data: {
        ...createTagDto,
        ...(authorId && { author: { connect: { id: authorId } } }),
      },
    })
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return this.prismaService.tag.update({
      where: { id },
      data: updateTagDto,
    })
  }

  remove(id: number) {
    return this.prismaService.tag.delete({ where: { id } })
  }

  async validateTagExists(id: number): Promise<TagEntity> {
    const tag = await this.findOneById(id)
    if (!tag) throw new NotFoundException(TAG_NOT_FOUND_BY_ID_MSG(id))
    return tag
  }

  async validateUniqueTitle(newTitle: string): Promise<void> {
    if (!newTitle) return
    const existingTag = await this.findOneByTitle(newTitle)
    if (existingTag && existingTag.title === newTitle) {
      throw new ConflictException(TAG_ALREADY_EXISTS_MSG(newTitle))
    }
  }
}
