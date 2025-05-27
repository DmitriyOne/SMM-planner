import { Controller, Body, Patch, Param, Delete, HttpCode, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto, UpdateUserPasswordDto, UpdateUserRoleDto } from './dto/update-user.dto'
import { PREFIX } from '../constants/prefix.constant'
import { capitalizeFirstLetter, toUpperCaseString } from '../utils/string.utils'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeleteUserResponseDto } from './dto/delete-user-response.dto.ts'
import {
  USER_DELETED_SUCCESS_MSG,
  USER_UPDATE_ROLE_SUCCESS_MSG,
  USER_UPDATED_SUCCESS_MSG,
} from '../constants/user.constant'
import { UserEntity } from './entities/user.entity'
import { Roles } from '../common/decorators/roles.decorator'
import { ERole } from '@prisma/client'
import { UpdateUserResponseDto, UpdateUserRoleResponseDto } from './dto/update-user-response.dto'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { checkOwnerAndUserRole, checkOwnership } from '../utils/authorization.utils'
import { WHO_CAN_ACCESS_THIS_ENDPOINT } from '../constants/endpoint.constant'

@Controller(PREFIX.USERS)
@ApiTags(capitalizeFirstLetter(PREFIX.USERS))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get(PREFIX.ALL)
  @Roles('super_admin')
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT('super_admin') })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const allUsers = await this.usersService.findAll()
    return allUsers.map((user) => new UserEntity(user))
  }

  @HttpCode(200)
  @Patch(PREFIX.CHANGE_PASSWORD)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async changePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @CurrentUser() currentUser: UserEntity) {
    const user = await this.usersService.validateUserIdExists(currentUser.id)
    checkOwnership(user.id, currentUser.id, 'user')
    await this.usersService.comparePassword(updateUserPasswordDto.oldPassword, user.password)
    const updatedUser = await this.usersService.changePassword(currentUser.id, updateUserPasswordDto)
    return { message: USER_UPDATED_SUCCESS_MSG(updatedUser.name) }
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
  @Get(PREFIX.ME)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@CurrentUser() currentUser: UserEntity) {
    return new UserEntity(currentUser)
  }

  @HttpCode(200)
  @Get(PREFIX.ID)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOneById(@Param('id') id: string, @CurrentUser() currentUser: UserEntity) {
    const user = await this.usersService.validateUserIdExists(id)
    checkOwnerAndUserRole(user.id, currentUser.id, 'user', currentUser.role)

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
  @Roles(ERole.super_admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: WHO_CAN_ACCESS_THIS_ENDPOINT("super_admin") })
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
