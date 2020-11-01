import {  IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {  
    @IsNumber()  id: number;
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  @IsEmail()  email: string;
}