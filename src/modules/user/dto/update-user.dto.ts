import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDtoWrite } from './create-user.dto'

export class UpdateUserDtoRead extends PartialType(CreateUserDtoWrite) {
  id: number
}
