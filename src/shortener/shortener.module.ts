import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from './shortener.entity';
import { ShortenerService } from './shortener.service';
import { LinkShortenerController } from './shortener.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UrlLink])],
  providers: [ShortenerService],
  controllers: [LinkShortenerController],
})
export class LinkModule {}
