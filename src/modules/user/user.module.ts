import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SharedModule } from 'src/shared/shared.module'
import { proxyName } from './common/proxyName/proxyName'
import { UserServiceWrite } from './services/write/user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: proxyName.name_read,
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserServiceWrite],
  exports: [],
})
export class UserModule {}
