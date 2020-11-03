import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from './shortener.entity';
import { ShortenerService } from './shortener.service';
import { LinkShortenerController } from './shortener.controller';
import { AuthModule }  from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([UrlLink])
  ],
  providers: [ShortenerService, RedisCacheService],
  controllers: [LinkShortenerController],
})
export class LinkModule {}
