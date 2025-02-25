import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany()
  }

  findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password)
    createUserDto.password = hashedPassword
    return this.prismaService.user.create({ data: createUserDto })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password)
      updateUserDto.password = hashedPassword
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } })
  }

  async hashPassword(password: string): Promise<string> {
    const salt = parseInt(process.env.SALT_ROUNDS ?? '10', 10)
    return bcrypt.hash(password, salt)
  }

  async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashPassword)
  }
}
