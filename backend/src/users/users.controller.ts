import { Controller, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeleteUserResponseDto } from './dto/delete-user-response.dto.ts'
import { USER_DELETED_SUCCESS_MSG, USER_NOT_FOUND_BY_ID_MSG } from 'src/constants/user.constant'
import { UserEntity } from './entities/user.entity'

@Controller(PREFIX.USERS)
@ApiTags(capitalizeFirstLetter(PREFIX.USERS))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll()
  }

  @Post(PREFIX.CREATE)
  @ApiOkResponse({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch(PREFIX.ID)
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto)

    if (!updatedUser) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return updatedUser
  }

  @HttpCode(200)
  @Post(PREFIX.ID)
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return user
  }

  @Delete(PREFIX.ID)
  @ApiOkResponse({ type: DeleteUserResponseDto })
  async remove(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    const deletedUser = await this.usersService.remove(id)

    if (!deletedUser) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return { message: USER_DELETED_SUCCESS_MSG(id) }
  }
}
