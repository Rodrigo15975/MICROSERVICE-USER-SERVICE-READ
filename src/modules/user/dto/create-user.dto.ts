export class CreateUserDtoWrite {
  avatar?: string
  dni: string
  lastname: string
  name: string
  password: string
  phone: string
  user_active: boolean
  role: {
    id: number
    role: string
  }
}
