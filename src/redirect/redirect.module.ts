import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { ShortenerService } from  '../shortener/shortener.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlLink } from '../shortener/shortener.entity'

@Module({
  imports: [
   
    TypeOrmModule.forFeature([UrlLink])
  ],
  controllers: [RedirectController],
  providers: [ ShortenerService ], 
})
export class RedirectModule {}
