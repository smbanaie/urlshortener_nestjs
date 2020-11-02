import { AuthService } from './auth.service'
import { Controller, Post, Body, Req , Res} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create.dto'
import { RegisterResult } from '../shared/result.status'
import { LoginUserDto } from '../user/dto/login.dto'
import { LoginResult } from '../shared/result.status'
import { HttpException,HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';



@Controller('auth')
export class AuthController {
 
    constructor(private readonly authService: 
        AuthService) {}

        @Post('register')  
        @ApiCreatedResponse({ status : 201, description: 'User Registeration ', type : RegisterResult } )
        public async register(@Body() createUserDto: CreateUserDto, @Res() res): Promise<RegisterResult> {    
            const result: RegisterResult = await this.authService.register(createUserDto,);
            if (result.status !== 'success') {
                throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
            }
            return res.status(HttpStatus.CREATED).json(result)
        }
        @Post('login')  
        @ApiResponse({ status : 200, description: 'Login With (Username Or Email) and Password', type : LoginResult } )
        public async login(@Body() loginUserDto: LoginUserDto, @Res() res): Promise<LoginResult> {
            let credentials =  await this.authService.login(loginUserDto);  
            return res.status(HttpStatus.OK).json({
                status: "success",
                message : "user signed in successfully",
                data: credentials
            })
        }
}
