import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany()
  }

  findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } })
  }
}
