import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices'
import { ROLE_FIND_ALL } from './common/patternNameRead/patterNameRead'
import { ROLE_CREATE } from './common/patternNameWrite/patternNameWrite'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @EventPattern(ROLE_CREATE)
  create(@Payload() createRoleDto: CreateRoleDto) {
    return { createRoleDto }
    this.roleService.create(createRoleDto)
  }
  @MessagePattern(ROLE_FIND_ALL)
  findAll() {
    return this.roleService.findAll()
  }
}
