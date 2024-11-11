import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  collection: 'role',
  timestamps: true,
})
export class Role extends Document {
  @Prop()
  role: string

  @Prop()
  id: number
}

export const SchemaRole = SchemaFactory.createForClass(Role)
