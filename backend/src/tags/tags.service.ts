import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.tag.findMany()
  }

  findOne(id: number) {
    return this.prismaService.tag.findUnique({ where: { id } })
  }

  create(createTagDto: CreateTagDto) {
    return this.prismaService.tag.create({ data: createTagDto })
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
