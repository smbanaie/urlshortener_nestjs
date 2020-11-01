import { Header,HttpCode } from '@nestjs/common';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express'
import { ShortenerService } from './shortener.service';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto';

@Controller("api/v1/shorten")
export class LinkShortenerController {
  constructor(private readonly service: ShortenerService) {}

  @Post('original_link')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async create(@Req() request: Request, @Body() dto: CreateDto): Promise<ShowDto> {
    return this.service.create(dto);
  }

  
}
