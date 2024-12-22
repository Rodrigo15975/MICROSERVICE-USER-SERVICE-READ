import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SharedModule } from 'src/shared/shared.module'
import { proxyName } from './common/proxyName/proxyName'
import { UserServiceWrite } from './services/write/user.service'
import { UserController } from './user.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: proxyName.name_read,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.getOrThrow('REDIS_HOST'),
            port: configService.getOrThrow('REDIS_PORT'),
            retryAttempts: 10,
            retryDelay: 10000,
            reconnectOnError(err) {
              const targetError = 'READONLY'
              console.log(err)
              if (err.message.includes(targetError)) return true

              return true
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserServiceWrite],
  exports: [],
})
export class UserModule {}
