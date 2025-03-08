import { Controller, Body, Patch, Param, Delete, HttpCode, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto'
import { PREFIX } from 'src/constants/prefix.constant'
import { capitalizeFirstLetter, toUpperCaseString } from 'src/utils/string.utils'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeleteUserResponseDto } from './dto/delete-user-response.dto.ts'
import {
  USER_DELETED_SUCCESS_MSG,
  USER_UPDATE_ROLE_SUCCESS_MSG,
  USER_UPDATED_SUCCESS_MSG,
} from 'src/constants/user.constant'
import { UserEntity } from './entities/user.entity'
import { Roles } from 'src/common/decorators/roles.decorator'
import { ERole } from '@prisma/client'
import { UpdateUserResponseDto, UpdateUserRoleResponseDto } from './dto/update-user-response.dto'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { checkOwnership } from 'src/utils/authorization.utils'
import { WHO_CAN_ACCESS_THIS_ENDPOINT } from 'src/constants/endpoint.constant'

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

  @Patch(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.usersService.validateUserIdExists(id)
    checkOwnership(user.id, currentUser.id, 'user')
    const updatedUser = await this.usersService.update(id, updateUserDto)
    return { message: USER_UPDATED_SUCCESS_MSG(updatedUser.name) }
  }

  @HttpCode(200)
  @Get(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOneById(@Param('id') id: string) {
    const user = await this.usersService.validateUserIdExists(id)
    return new UserEntity(user)
  }

  @Delete(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteUserResponseDto })
  async remove(@Param('id') id: string, @CurrentUser() currentUser: UserEntity): Promise<DeleteUserResponseDto> {
    const user = await this.usersService.validateUserIdExists(id)
    checkOwnership(user.id, currentUser.id, 'user')
    await this.usersService.remove(id)
    return { message: USER_DELETED_SUCCESS_MSG(id) }
  }

  @Patch(PREFIX.UPDATE_ROLE)
  @Roles(ERole.admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT('admin') })
  @ApiOkResponse({ type: UpdateUserRoleResponseDto })
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateUserRoleDto,
  ): Promise<UpdateUserRoleResponseDto> {
    const existingUser = await this.usersService.validateUserIdExists(id)
    this.usersService.validateRole(existingUser, updateRoleDto.role)

    const user = await this.usersService.updateUserRole(id, updateRoleDto)
    return { message: USER_UPDATE_ROLE_SUCCESS_MSG(user.name, toUpperCaseString(user.role)) }
  }
}
