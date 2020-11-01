import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from  './user.entity' ; 


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService]

})
export class UserModule {}
