import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as Redis from 'ioredis'
import { ShortenerService } from  '../shortener/shortener.service'
import { configuration as RedisConfig } from '../../config/redis.config';


const client = new Redis({
    host: RedisConfig.host,
    port: RedisConfig.port,
    // password: 'YOUR_PASSWORD',
});
const ShortCodesSetName = process.env.URL_SHORTCODE_SET;

@Injectable()
export class RedisCacheService {
    constructor(

        @Inject(forwardRef(() => ShortenerService ))
        private readonly shortenerService: ShortenerService,
        ) {}
    async getLongURL(shortCode: string): Promise<string> {
        let cache_key = `${process.env.URL_CACHE_PREFIX}${shortCode}`
        console.log(`Chache Key : ${cache_key}`);
        let url = await client.get(cache_key)
        if (url) 
            return url
        else {
            const link = await this.shortenerService.link_info(shortCode)
            console.log(`Retrived From DB - ShortCode : ${shortCode} - URL : ${link.longUrl}`)
            client.set(cache_key, link.longUrl, 'ex', process.env.URL_CACHE_TTL)
            return link.longUrl

        }
    }


    async getShortCode(shortCode : string) : Promise<boolean>{

        const k : Redis.BooleanResponse = await client.sismember(ShortCodesSetName,shortCode)
        console.log(`Check Cache For Shortcode(${shortCode}) : ${k}`)
        if(k == 1)
            return true;
        else {
            client.sadd(ShortCodesSetName,shortCode)
            console.log(`Key Added To ShortCode Set in Redis(${shortCode})`)
            return false;
        }
    }
}
