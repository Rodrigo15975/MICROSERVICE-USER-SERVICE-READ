import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, SchemaRole } from 'src/modules/role/entities/user-schema'
import { SchemaUser, User } from 'src/modules/user/entities/user-schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Para leer variables de.env
    }), // Para leer variables de .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Obtén la URI desde el entorno
      }),
    }),
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
