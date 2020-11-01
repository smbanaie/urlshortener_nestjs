import { IsAlphanumeric, IsUrl, Length, IsOptional, IsNotEmpty, IsEmail, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {  
    @MinLength(3)  
    @ApiProperty({description:'User Name >= 3 Chars'})
    username: string;

    @MinLength(3)
    @ApiProperty({description:'Password >= 3 Chars'})
    password: string;


    @IsNotEmpty()
    @IsEmail()  
    email: string;
}