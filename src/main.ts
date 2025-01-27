import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
      retryAttempts: 10,
      retryDelay: 10000,
      reconnectOnError(err) {
        const targetError = 'READONLY'
        console.log(err)
        if (err.message.includes(targetError)) return true

        return true
      },
    },
  })

  const config = new DocumentBuilder()
    .setTitle('Documentación de Microservicio user service read')
    .setDescription(
      'API del microservicio User Write para gestionar funcionalidades específicas',
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('microservice-user-service-read', app, document)
  const PORT = Number(process.env.PORT) || 4001

  await app.startAllMicroservices()
  await app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'development')
      return Logger.verbose(
        `Servidor escuchando en el puerto ${PORT} en modo ${process.env.NODE_ENV}`,
      )

    Logger.log(`Servidor iniciado en el puerto ${PORT}`)
  })
}
bootstrap()
