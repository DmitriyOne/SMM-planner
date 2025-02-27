import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PrismaService } from 'src/prisma/prisma.service'

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

  findManyByTitle(title: string) {
    return this.prismaService.tag.findMany({ where: { title: title } })
  }

  create(createTagDto: CreateTagDto) {
    const { authorId, ...createTag } = createTagDto
    return this.prismaService.tag.create({
      data: {
        ...createTag,
        ...(authorId && { author: { connect: { id: authorId } } }),
      },
    })
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prismaService.tag.update({
      where: { id },
      data: updateTagDto,
    })
  }

  remove(id: number) {
    return this.prismaService.tag.delete({ where: { id } })
  }
}
