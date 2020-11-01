import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'
import { UsersService } from '../user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity }  from '../user/user.entity'

@Module({  
    imports: [    
        UserModule,    
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY, signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
        TypeOrmModule.forFeature([UserEntity])
    ], 
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy, UsersService],  
    exports: [
        PassportModule, 
        JwtModule
    ], 
})
export class AuthModule {}
