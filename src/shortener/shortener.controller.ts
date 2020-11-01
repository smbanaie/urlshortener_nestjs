import { Header,HttpCode } from '@nestjs/common';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express'
import { ShortenerService } from './shortener.service';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';
import {ApiResponse} from '@nestjs/swagger';

@Controller("api/v1/shorten")
export class LinkShortenerController {
  constructor(private readonly service: ShortenerService) {}

  @Post('original_link')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 201, description: 'Short Code Generated Sucessfully' })
  @ApiResponse({ status: 409, description: 'Provided Code Already Exist' })
  async create(@Req() request: Request, @Body() dto: CreateDto): Promise<ShowDto> {
    return this.service.create(dto);
  }

  
}
