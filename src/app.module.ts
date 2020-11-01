import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './shortener/shortener.module';
import { configuration as DBConfig }  from '../config/database.config';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [TypeOrmModule.forRoot(DBConfig), LinkModule]
  })
export class AppModule {}
