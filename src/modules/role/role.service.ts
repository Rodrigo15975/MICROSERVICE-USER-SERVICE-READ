import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/user-schema'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly schemaRole: Model<Role>,
    @Inject(CACHE_MANAGER) private readonly cacheRole: Cache,
  ) {}

  async create(data: CreateRoleDto) {
    await this.schemaRole.create(data)
  }

  async findAll() {
    // 1. Check if data exists in cache
    // more information key ----> microservices-users-roles:roles-find-all

    const key = `roles:find-all`
    try {
      const rolesCache = await this.cacheRole.get<Role[]>(key)

      if (rolesCache) return rolesCache

      const rolesDB = await this.schemaRole.find()

      await this.cacheRole.set(key, rolesDB, 86400000)

      return rolesDB
    } catch (error) {
      console.log(error)
      return new InternalServerErrorException(error, error.message)
    }
  }
}
