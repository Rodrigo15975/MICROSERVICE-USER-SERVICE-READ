import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SharedModule } from 'src/shared/shared.module'
import { proxyName } from './common/proxyName/proxyName'
import { UserServiceWrite } from './services/write/user.service'
import { UserController } from './user.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from 'src/cache/cache.module'

@Module({
  imports: [
    CacheModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
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
            password: configService.getOrThrow('REDIS_PASSWORD'),
            tls: {
              servername: configService.getOrThrow('REDIS_HOST'),
            },
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
})
export class UserModule {}
