import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsJSON } from 'class-validator';

export class LoginResultPayload {
    @ApiProperty({ type: String, example : 'mojtaba' })
    @IsString()
    username: string;
    @ApiProperty({ type: String, example : '300' })
    @IsString()
    expiresIn: string;
    @ApiProperty({ type: String , example :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vanRhYmEiLCJpYXQiOjE2MDQyNjkzMjcsImV4cCI6MTYwNDI2OTMyN30.Koxu6zopNCXdOmQFP0KlpcZBYLA7C3iaQN2j3hc7-iM"})
    @IsString()
    accessToken: string;
}
export class LoginResult {
    @ApiProperty({ example: 'success' })
    status: string;
    @ApiProperty({ example: 'Login Successfull' })
    message: string;
    @ApiProperty({ type: LoginResultPayload })
    @IsJSON()
    data: LoginResultPayload
} 

export class ApiSuccessResult {
    @ApiProperty({ example: 'success' })
    status: string;
    @ApiProperty({ example: 'Link Shortened Successfully ' })
    message: string;
} 