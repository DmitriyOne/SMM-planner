import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from '../common/configs/env-schema.config'
import { ERole } from '@prisma/client'
import { AuthRegisterDto } from '../auth/dto/register.dto'
import { USER_HAS_THIS_ROLE_MSG, USER_NOT_FOUND_BY_ID_MSG } from '../constants/user.constant'
import { UserEntity } from './entities/user.entity'
import { toUpperCaseString } from '../utils/string.utils'
import { AUTH_EMAIL_ALREADY_EXISTS_MSG } from '../constants/auth.constant'

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

  async validateUserIdExists(id: string) {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }
    return user
  }

  async validateUserEmailExists(email: string) {
    const user = await this.findOneByEmail(email)
    if (user) {
      throw new UnauthorizedException(AUTH_EMAIL_ALREADY_EXISTS_MSG(email))
    }
    return user
  }

  validateRole(user: UserEntity, newRole: string): void {
    if (user.role === newRole) {
      throw new ConflictException(USER_HAS_THIS_ROLE_MSG(user.name, toUpperCaseString(newRole)))
    }
  }
}
