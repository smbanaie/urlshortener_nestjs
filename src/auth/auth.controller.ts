import { AuthService } from './auth.service'
import { Controller, Post, Body, Req , Res} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create.dto'
import { RegistrationStatus } from '../shared/registration.status'
import { LoginUserDto } from '../user/dto/login.dto'
import { LoginResult } from '../shared/result.status'
import { HttpException,HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';



@Controller('auth')
export class AuthController {
 
    constructor(private readonly authService: 
        AuthService) {}

        @Post('register')  
        @ApiCreatedResponse()
        public async register(@Body() createUserDto: CreateUserDto, @Res() res): Promise<RegistrationStatus> {    
            const result: 
            RegistrationStatus = await this.authService.register(createUserDto,);
            if (!result.success) {
                throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
            }
            return res.status(HttpStatus.CREATED).json({
                status: "success",
                message : "user registered successfully",
                data: null
            })
        }
        @Post('login')  
        @ApiResponse({ status : 200, description: 'Login With Username and Password', type : LoginResult } )
        public async login(@Body() loginUserDto: LoginUserDto, @Res() res): Promise<LoginResult> {
            let credentials =  await this.authService.login(loginUserDto);  
            return res.status(HttpStatus.OK).json({
                status: "success",
                message : "user signed in successfully",
                data: credentials
            })
        }
}
