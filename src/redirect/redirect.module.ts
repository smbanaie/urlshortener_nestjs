import { Module, CacheModule} from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { ShortenerService } from  '../shortener/shortener.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from '../shortener/shortener.entity'
import { Accesses } from './access.entity'
import { RedirectService } from './redirect.service'
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accesses,UrlLink]),
  ],
  controllers: [RedirectController],
  providers: [ RedirectService, ShortenerService, RedisCacheService ], 
})
export class RedirectModule {}
