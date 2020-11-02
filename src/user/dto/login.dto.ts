import { IsAlphanumeric, IsUrl, Length, IsOptional, IsNotEmpty, IsEmail, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {  
    @MinLength(3)  
    @ApiProperty({description:'User Name Or Email', example:"yektanet OR test@gmail.com"})
    input: string;

    @MinLength(3)
    @ApiProperty({description:'Password >= 3 Chars', example:"123456"})
    password: string;
    
}



