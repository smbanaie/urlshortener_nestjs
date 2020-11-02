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



@Module({
  imports: [TypeOrmModule.forRoot(DBConfig),  TypeOrmModule.forFeature([UserEntity]), LinkModule, UserModule, AuthModule, RedirectModule],
  providers: [UsersService, AuthService, RedirectService]
  })
export class AppModule {}
