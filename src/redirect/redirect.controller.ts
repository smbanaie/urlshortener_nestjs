import { Header } from '@nestjs/common';
import { Controller, Get, Body, Req, Res, Param, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import {ApiResponse} from '@nestjs/swagger';
import { RedirectService } from './redirect.service'
import { ShortenerService } from  '../shortener/shortener.service'
import { HttpException,HttpStatus } from '@nestjs/common';


@Controller('r')
export class RedirectController {
    constructor(
        private readonly shortenerService: ShortenerService
        ) {}
    @Get(':code')
    @ApiResponse({ status: 301, description: 'Redirect By Short Code ' })
    async redirect(@Res() res, @Param("code") short_code: string) {
        const link = await this.shortenerService.link_info(short_code)
        if (link.longUrl !==null)
            res.redirect(link.longUrl)
        else 
            throw new HttpException("The provided Code is Invalid!", HttpStatus.BAD_REQUEST);    
      }
}
