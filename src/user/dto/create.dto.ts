import { IsAlphanumeric, isAlphanumeric, Length, IsOptional, IsNotEmpty, IsEmail, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {  
    @MinLength(3)  
    @ApiProperty({description:'User Name >= 3 Alphanumeric Chars', example:'yektanet'})
    username: string;

    @MinLength(3)
    @ApiProperty({description:'Password >= 3 Chars', example:'123456'})
    @IsAlphanumeric()
    password: string;


    @IsNotEmpty()
    @IsEmail() 
    @ApiPropertyOptional({description:'A valid Email Address Must Be provided', example:"info@yektanet.com"}) 
    email: string;
}