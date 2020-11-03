import { Header } from '@nestjs/common';
import { Controller, Get, Body, Req, Query, UseGuards,Param } from '@nestjs/common';
import { Request } from 'express'
import { AnalyticsService } from './analytics.service';
import {ApiResponse,ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UrlViewQueryDto } from './dto/views.query.dto'


@Controller("api/v1/analytics/url")
export class AnalyticsController {

    constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/views')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200})
  @ApiBearerAuth() 
  @UseGuards(AuthGuard())
  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    enum : ["All", "Browser", "Device"]

  })
  @ApiQuery({
    name: 'day',
    required: false,
    type: Number,
    description :`if day not set, it's set to 0 (current day)`
  }) 
  @ApiQuery({
    name: 'hour',
    required: false,
    type: Number,
    description : 'If Time is set,day will ignored.'
  }) 

  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    description : 'URL Short Code.'
  }) 

  async url_views_info(@Req() req: Request , @Query('code') code, @Query('type') type): Promise<{result:string}> {
   
    return {result:`Code : ${code} - It Must Be Implemented Using HyperLogLog`};
  }


  @Get('/users')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200 })
  @ApiBearerAuth() 
  @UseGuards(AuthGuard()) 
  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    enum : ["All", "Browser", "Device"]

  })
  @ApiQuery({
    name: 'day',
    required: false,
    type: Number,
    description :`if day not set, it's set to 0 (current day)`
  }) 
  @ApiQuery({
    name: 'hour',
    required: false,
    type: Number,
    description : 'If Time is set,day will ignored.'
  }) 

  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    description : 'URL Short Code.'
  }) 

  async url_users_info(@Req() req: Request , @Query('code') code, @Query('type') type): Promise<{result:string}> {
   
    return {result:`Code : ${code} - It Must Be Implemented Using HyperLogLog`};  }

}
