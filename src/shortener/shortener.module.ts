import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from './shortener.entity';
import { ShortenerService } from './shortener.service';
import { LinkShortenerController } from './shortener.controller';
import { AuthModule }  from '../auth/auth.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([UrlLink])
  ],
  providers: [ShortenerService],
  controllers: [LinkShortenerController],
})
export class LinkModule {}
