import { Controller, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { capitalizeFirstLetter } from 'src/utils/string.utils'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeleteUserResponseDto } from './dto/delete-user-response.dto.ts'
import { USER_DELETED_SUCCESS_MSG, USER_NOT_FOUND_BY_ID_MSG } from 'src/constants/user.constant'
import { UserEntity } from './entities/user.entity'

@Controller(PREFIX.USERS)
@ApiTags(capitalizeFirstLetter(PREFIX.USERS))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get(PREFIX.ALL)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const allUsers = await this.usersService.findAll()
    return allUsers.map((user) => new UserEntity(user))
  }

  @Post(PREFIX.CREATE)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto)
    return new UserEntity(newUser)
  }

  @Patch(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto)

    if (!updatedUser) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return new UserEntity(updatedUser)
  }

  @HttpCode(200)
  @Get(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return new UserEntity(user)
  }

  @Delete(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteUserResponseDto })
  async remove(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    const deletedUser = await this.usersService.remove(id)

    if (!deletedUser) {
      throw new NotFoundException(USER_NOT_FOUND_BY_ID_MSG(id))
    }

    return { message: USER_DELETED_SUCCESS_MSG(id) }
  }
}
