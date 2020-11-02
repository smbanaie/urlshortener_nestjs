import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { ShortenerService } from  '../shortener/shortener.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from '../shortener/shortener.entity'
import { Accesses } from './access.entity'
import { RedirectService } from './redirect.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Accesses,UrlLink])
  ],
  controllers: [RedirectController],
  providers: [ RedirectService, ShortenerService ], 
})
export class RedirectModule {}
