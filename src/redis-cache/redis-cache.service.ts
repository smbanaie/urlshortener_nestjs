import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis'
import { ShortenerService } from  '../shortener/shortener.service'


const client = new Redis({
    host: 'localhost',
    port: 6379,
    // password: 'YOUR_PASSWORD',
});

@Injectable()
export class RedisCacheService {
    constructor(
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
}
