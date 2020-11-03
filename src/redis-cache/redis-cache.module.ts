import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from '../shortener/shortener.entity' 
import { RedisCacheService } from './redis-cache.service'
import { ShortenerService } from '../shortener/shortener.service'
import { LinkModule } from '../shortener/shortener.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([UrlLink]),
      ],
    providers: [  RedisCacheService, ShortenerService ], 
  })
export class RedisCacheModule {}
