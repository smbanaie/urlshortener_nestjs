import { Header } from '@nestjs/common';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { ShortenerService } from './shortener.service';
import { CreateShortLinkDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';
import {ApiResponse,ApiBearerAuth} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../user/dto/show.dto'


@Controller("api/v1/shorten")
export class LinkShortenerController {
  constructor(private readonly service: ShortenerService) {}

  @Post('link')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 201, description: 'Short Code Generated Sucessfully' })
  @ApiResponse({ status: 409, description: 'Provided Code Already Exist' })
  @ApiBearerAuth() 
  @UseGuards(AuthGuard()) 
  async create(@Req() req: Request, @Body() dto: CreateShortLinkDto): Promise<ShowDto> {
    const user = <UserDto>req.user;
    console.log(`User : ${user}`)
    return this.service.create(user, dto);
  }

}
