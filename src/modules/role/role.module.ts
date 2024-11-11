import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { SharedModule } from 'src/shared/shared.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { proxyName } from './common/proxyName/proxyName'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: proxyName.name,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
