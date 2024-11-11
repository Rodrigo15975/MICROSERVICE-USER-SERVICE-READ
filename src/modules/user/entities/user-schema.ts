import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User extends Document {
  @Prop()
  avatar?: string

  @Prop({})
  dni: string

  @Prop({
    index: true,
  })
  id: number

  @Prop()
  lastname: string

  @Prop()
  name: string

  @Prop()
  password: string

  @Prop({
    index: true,
  })
  phone: string

  @Prop()
  user_active: boolean

  @Prop()
  roleId: number

  @Prop({ type: Object })
  role: {
    id: number
    role: string
  }

  @Prop({
    type: Object,
  })
  auditoria: {
    avatar?: string
    role: string
    name: string
    lastname: string
  }
}

export const SchemaUser = SchemaFactory.createForClass(User)
