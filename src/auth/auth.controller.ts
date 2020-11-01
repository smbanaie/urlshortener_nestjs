import { AuthService } from './auth.service'
import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create.dto'
import { RegistrationStatus } from '../shared/registration.status'
import { LoginUserDto } from '../user/dto/login.dto'
import { LoginStatus } from '../shared/login.status'
import { HttpException,HttpStatus } from '@nestjs/common';


@Controller('auth')
export class AuthController {
 
    constructor(private readonly authService: 
        AuthService) {}

        @Post('register')  
        public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {    
            const result: 
            RegistrationStatus = await this.authService.register(createUserDto,);
            if (!result.success) {
                throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
            }
            return result;  
        }
        @Post('login')  
        public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
            return await this.authService.login(loginUserDto);  
        }
}

