import { Injectable } from '@nestjs/common';
import  { UsersService } from '../user/user.service'
import { JwtService } from  '@nestjs/jwt'
import { RegistrationStatus } from  '../shared/registration.status'
import { UserDto } from '../user/dto/show.dto';
import { LoginUserDto } from '../user/dto/login.dto'
import { CreateUserDto } from '../user/dto/create.dto'
import { JwtPayload } from '../shared/jwt.payload'
import { HttpException,HttpStatus } from '@nestjs/common';



@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(userDto: CreateUserDto): 
    Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }


    async login(loginUserDto: LoginUserDto): Promise<{username,accessToken}> {    
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        

        
        return {
            id : user.id, username: user.username, ...token,    
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
