import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, SchemaRole } from 'src/modules/role/entities/user-schema'
import { SchemaUser, User } from 'src/modules/user/entities/user-schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: SchemaUser,
      },
      {
        name: Role.name,
        schema: SchemaRole,
      },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class SharedModule {}
