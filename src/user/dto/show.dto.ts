import {  IsNotEmpty, IsEmail, IsNumber, IsString, IsAlphanumeric } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UserDto {  
    @ApiProperty({type:Number})
    id: number;
    
    @ApiProperty({ type: String, example : 'mojtaba' })
    username: string;
    
    
    @ApiProperty({ type : String})
    email: string;
}