import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TypeUserServiceRead } from 'types/type-user'
import { CreateUserDtoWrite } from '../../dto/create-user.dto'
import { UpdateUserDtoRead } from '../../dto/update-user.dto'
import { User } from '../../entities/user-schema'

@Injectable()
export class UserServiceWrite implements TypeUserServiceRead {
  constructor(
    @InjectModel(User.name) private readonly schemaUser: Model<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return await this.schemaUser
      .findOne({
        id,
      })
      .select('-password')
  }

  async create(data: CreateUserDtoWrite): Promise<void> {
    try {
      await this.schemaUser.create(data)
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
    } catch (error) {
      throw new InternalServerErrorException(error, error.message)
    }
  }

  async findAll(): Promise<User[] | HttpException> {
    try {
      return await this.schemaUser
        .find()
        .sort({
          createdAt: -1,
        })
        .select('-auditoria')
    } catch (error) {
      console.log(error, 'Error al obtener la lista de los usuarios (MONGODB)')
      return new InternalServerErrorException(error)
    }
  }
}
