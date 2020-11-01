import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './shortener/shortener.module';
import { configuration as DBConfig }  from '../config/database.config';
import { UserModule } from './user/user.module';
import { UsersService } from './user/user.service';
import { UserEntity } from  './user/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule }  from './auth/auth.module';



@Module({
  imports: [TypeOrmModule.forRoot(DBConfig),  TypeOrmModule.forFeature([UserEntity]), LinkModule, UserModule, AuthModule],
  providers: [UsersService, AuthService]
  })
export class AppModule {}
