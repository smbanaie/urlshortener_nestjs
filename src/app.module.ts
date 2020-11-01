import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './shortener/shortener.module';
import { configuration as DBConfig }  from '../config/database.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UsersService } from './user/user.service';
import { UserEntity } from  './user/user.entity'



@Module({
  imports: [TypeOrmModule.forRoot(DBConfig),  TypeOrmModule.forFeature([UserEntity]), LinkModule, UserModule],
  providers: [UsersService]
  })
export class AppModule {}
