import { HttpException } from '@nestjs/common'
import { CreateUserDtoWrite } from 'src/modules/user/dto/create-user.dto'
import { UpdateUserDtoRead } from 'src/modules/user/dto/update-user.dto'
import { User } from 'src/modules/user/entities/user-schema'

export interface TypeUserServiceRead {
  create(data: CreateUserDtoWrite): Promise<void>
  update(id: number, data: UpdateUserDtoRead): Promise<void>
  remove(id: number): Promise<void>
  findAll(): Promise<User[] | HttpException>
  findOne(id: number): Promise<User | null>
}
