import {  IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}