import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CacheService } from 'src/cache/cache.service'
import { TypeUserServiceRead } from 'types/type-user'
import { KEY_CACHE_USER } from '../../common/key-cache.user'
import { CreateUserDtoWrite } from '../../dto/create-user.dto'
import { UpdateUserDtoRead } from '../../dto/update-user.dto'
import { User } from '../../entities/user-schema'

@Injectable()
export class UserServiceWrite implements TypeUserServiceRead {
  constructor(
    @InjectModel(User.name) private readonly schemaUser: Model<User>,
    private readonly cacheService: CacheService,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return await this.schemaUser
      .findOne({
        id,
      })
      .select('-password -auditoria')
  }

  async create(data: CreateUserDtoWrite): Promise<void> {
    try {
      await this.schemaUser.create(data)
      await this.cacheService.delete(KEY_CACHE_USER)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.schemaUser.findOneAndDelete({
        id,
      })
      await this.cacheService.delete(KEY_CACHE_USER)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }
  async update(id: number, data: UpdateUserDtoRead): Promise<void> {
    try {
      await this.schemaUser.findOneAndUpdate(
        {
          id,
        },
        data,
      )
      await this.cacheService.delete(KEY_CACHE_USER)
    } catch (error) {
      throw new InternalServerErrorException(error, error.message)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const findAllUserCache =
        await this.cacheService.get<User[]>(KEY_CACHE_USER)
      if (findAllUserCache) return findAllUserCache
      const findAllUser = await this.schemaUser
        .find()
        .sort({
          createdAt: -1,
        })
        .select('-auditoria')
      await this.cacheService.set(KEY_CACHE_USER, findAllUser, '10m')
      return findAllUser
    } catch (error) {
      console.log(error, 'Error al obtener la lista de los usuarios (MONGODB)')
      throw new InternalServerErrorException(error)
    }
  }
}
