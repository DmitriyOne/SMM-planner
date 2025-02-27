import { Injectable } from '@nestjs/common'
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from 'src/common/configs/env-schema.config'
import { ERole } from '@prisma/client'
import { AuthRegisterDto } from 'src/auth/dto/register.dto'

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService<EnvConfig>,
  ) {}

  findAll() {
    return this.prismaService.user.findMany({ include: { posts: true, tags: true } })
  }

  findOneById(id: string) {
    return this.prismaService.user.findUnique({ where: { id }, include: { posts: true, tags: true } })
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  async create(createUserDto: AuthRegisterDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password)
    createUserDto.password = hashedPassword
    return this.prismaService.user.create({ data: { ...createUserDto, role: ERole.reader } })
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

  async updateUserRole(id: string, updateUserDto: UpdateUserRoleDto) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        role: updateUserDto.role,
      },
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } })
  }

  async hashPassword(password: string): Promise<string> {
    const salt = this.configService.get<number>('SALT_ROUNDS')
    return bcrypt.hash(password, salt)
  }

  async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashPassword)
  }
}
