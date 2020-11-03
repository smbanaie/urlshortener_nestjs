import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './shortener/shortener.module';
import { configuration as DBConfig }  from '../config/database.config';
import { UserModule } from './user/user.module';
import { UsersService } from './user/user.service';
import { UserEntity } from  './user/user.entity';
import { AuthService } from './auth/auth.service';
import { RedirectService } from './redirect/redirect.service';
import { RedirectModule } from './redirect/redirect.module';
import { AuthModule }  from './auth/auth.module';
import { Accesses } from './redirect/access.entity';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ShortenerService } from './shortener/shortener.service';
import { UrlLink }  from './shortener/shortener.entity'

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig),  TypeOrmModule.forFeature([UserEntity, Accesses, UrlLink]), LinkModule, UserModule, AuthModule, RedirectModule, RedisCacheModule],
  providers: [UsersService, AuthService, RedirectService, ShortenerService, RedisCacheService]
  })
export class AppModule {}
