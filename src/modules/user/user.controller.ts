import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

import {
  USER_CREATE_READ,
  USER_FIND_ALL_READ,
  USER_FIND_ONE_READ,
  USER_REMOVE_READ,
  USER_UPDATE_READ,
} from './common/patternNameRead/patternNameRead'
import { CreateUserDtoWrite } from './dto/create-user.dto'
import { UpdateUserDtoRead } from './dto/update-user.dto'
import { UserServiceWrite } from './services/write/user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserServiceWrite) {}

  @EventPattern(USER_CREATE_READ)
  create(@Payload() createUserDto: CreateUserDtoWrite) {
    return this.userService.create(createUserDto)
  }

  @EventPattern(USER_UPDATE_READ)
  update(@Payload() updateUserDto: UpdateUserDtoRead) {
    return this.userService.update(updateUserDto.id, updateUserDto)
  }

  @MessagePattern(USER_FIND_ONE_READ)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id)
  }

  @EventPattern(USER_REMOVE_READ)
  remove(@Payload() id: number) {
    return this.userService.remove(id)
  }

  @MessagePattern(USER_FIND_ALL_READ)
  findAll() {
    return this.userService.findAll()
  }
}
