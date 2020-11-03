import { Controller, Get, Req, Res, Param, CacheKey, CacheTTL, Headers, UseInterceptors} from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import { ShortenerService } from  '../shortener/shortener.service'
import { HttpException,HttpStatus  } from '@nestjs/common';
import { CreateAccessInfoDto } from './dto/access.dto'
import { RedirectService } from './redirect.service'
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import * as useragent from 'useragent';

@Controller('r')
export class RedirectController {
    constructor(
        private readonly shortenerService: ShortenerService,
        private readonly redirectService: RedirectService,
        private readonly redisCacheService: RedisCacheService,

        ) {}
    @Get(':code')
    @ApiResponse({ status: 301, description: 'Redirect By Short Code ' })
    async redirect(@Res() res, @Param("code") short_code: string, @Req() req, @Headers() header) {
        const link = await this.shortenerService.link_info(short_code)
        let access_log  = new CreateAccessInfoDto();
        if (link.longUrl !==null){
            access_log.link_id = link.id;
            let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress 
                            || req.socket.remoteAddress ||  req.connection.socket.remoteAddress;
            access_log.ip = ip.replace(/^.*:/, '')
            access_log.userAgent = req.headers['user-agent'];
            access_log.referrerURL = req.get('Referrer')
            var agent = useragent.parse(req.headers['user-agent']);
            access_log.browser = agent.toAgent();
            access_log.os = agent.os.toString();
            access_log.device = agent.device.toString();
            this.redirectService.log_redirect_stats(access_log);


            res.redirect( await this.redisCacheService.getLongURL(short_code))
        }
        else 
            throw new HttpException("The provided Code is Invalid!", HttpStatus.BAD_REQUEST);    
      }
}
