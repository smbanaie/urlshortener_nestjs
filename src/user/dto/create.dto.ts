import { IsAlphanumeric, IsUrl, Length, IsOptional, IsNotEmpty, IsEmail, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {  
    @MinLength(3)  
    @ApiProperty({description:'User Name >= 3 Chars', example:'yektanet'})
    username: string;

    @MinLength(3)
    @ApiProperty({description:'Password >= 3 Chars', example:'123456'})
    password: string;


    @IsNotEmpty()
    @IsEmail() 
    @ApiPropertyOptional({description:'A valid Email Address', example:"info@yektanet.com"}) 
    email: string;
}