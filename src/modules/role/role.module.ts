import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { SharedModule } from 'src/shared/shared.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName/proxyName'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: proxyName.name,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.getOrThrow('REDIS_HOST'),
            port: configService.getOrThrow('REDIS_PORT'),
          },
          retryAttempts: 10,
          retryDelay: 10000,
          reconnectOnError(err: Error) {
            const targetError = 'READONLY'
            console.log(err)
            if (err.message.includes(targetError)) return true

            return true
          },
        }),
        inject: [ConfigService],
      },
    ]),
    SharedModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
