import { Injectable } from '@nestjs/common';
import  { UsersService } from '../user/user.service'
import { JwtService } from  '@nestjs/jwt'
import { RegisterResult } from  '../shared/result.status'
import { UserDto } from '../user/dto/show.dto';
import { LoginUserDto } from '../user/dto/login.dto'
import { CreateUserDto } from '../user/dto/create.dto'
import { JwtPayload } from '../shared/jwt.payload'
import { HttpException,HttpStatus } from '@nestjs/common';
import { toUserDto } from 'src/shared/mapper';
import  { isEmail } from 'class-validator';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(userDto: CreateUserDto): 
    Promise<RegisterResult> {
        let status = 'success'
        let message = 'User Registered!'
        let data = null
        try {
           let user =  await this.usersService.create(userDto);
           return  {
               status : status,
               message : message,
               data : user
           }
        } catch (err) {
            return {
                message : err,
                status :'failure' ,
                data : null
            }
        }
    }


    async login(loginUserDto: LoginUserDto): Promise<{username,accessToken}> {    
        // find user in db    
        let user = null 
        if (isEmail(loginUserDto.input)){
            user =  await this.usersService.findByLogin(loginUserDto,true);
         }
        else         
            user =  await this.usersService.findByLogin(loginUserDto, false);
        


        // generate and sign token    
        const token = this._createToken(user);
        

        
        return {
            username: user.username, ...token,    
        };  
    }
    
    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
