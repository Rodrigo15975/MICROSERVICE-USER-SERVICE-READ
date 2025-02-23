import { Module } from '@nestjs/common'
import { CacheService } from './cache.service'
import { Cacheable } from 'cacheable'
import KeyvRedis from '@keyv/redis'
import { CACHE_INSTANCE } from './cache.name'
import { ConfigService } from '@nestjs/config'
@Module({
  providers: [
    CacheService,
    {
      provide: CACHE_INSTANCE,
      useFactory: async (configService: ConfigService) => {
        const secondary = new KeyvRedis({
          url: configService.getOrThrow('KEY_URL_REDIS'),
          password: configService.getOrThrow('REDIS_PASSWORD'),
        })
        return new Cacheable({
          secondary,
          ttl: '4h',
        })
      },
      inject: [ConfigService],
    },
  ],
  exports: [CACHE_INSTANCE, CacheService],
})
export class CacheModule {}
