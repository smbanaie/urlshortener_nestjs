import * as ShortId from 'shortid';
import { HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlLink } from './shortener.entity';
import { CreateShortLinkDto } from './dto/create.dto';
import { LinkInfoDto } from './dto/show.dto'
import { UserDto } from '../user/dto/show.dto';
import { RedisCacheService } from '../redis-cache/redis-cache.service';


@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(UrlLink)
    private readonly linkRepo: Repository<UrlLink>,
    
    @Inject(forwardRef(() => RedisCacheService ))
    private readonly cacheService: RedisCacheService,

  ) { }

  async create({ id }: UserDto, createLinkDto: CreateShortLinkDto): Promise<LinkInfoDto> {


    let existingCode = null;
    let shortCode = createLinkDto.ShortCode;
    console.log(`At The Beginning of Shorturl Generation : Provided Code : ${shortCode}`)
    if (shortCode) {
      existingCode = await this.cacheService.getShortCode(shortCode);
      if (existingCode) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: `Error - The Provided Short Code :  ${shortCode} is Already Exist. Try With a New One!`,
        }, HttpStatus.CONFLICT);
      }
      else {
        existingCode = await this.linkRepo.findOne({ where: { code: shortCode } });
        if (existingCode) {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: `Error - The Provided Short Code :  ${shortCode} is Already Exist. Try With a New One!`,
          }, HttpStatus.CONFLICT);
        }
      }
    }
    else do {
      shortCode = (ShortId.generate()).replace(/[^\w\d]/, '').replace('_', '').substring(0, 6)
      existingCode = await this.cacheService.getShortCode(shortCode);
      // existingCode = await this.linkRepo.findOne({ where: { code: shortCode } });
      console.log(`Existing Cheched Against Redis(${shortCode}) : ${existingCode}`);
    } while (existingCode != false);

    const link = this.linkRepo.create({
      url: createLinkDto.longUrl,
      code: shortCode,
      user_id: id,
    });

    this.linkRepo.save(link);

    let obj = new LinkInfoDto()
    obj.longUrl = createLinkDto.longUrl
    obj.shortLink = `${process.env.URL}:${process.env.PORT}/r/${shortCode}`

    return obj;

  }

  async link_info(code: string): Promise<LinkInfoDto> {
    const link = await this.linkRepo.findOne({ where: { code: code } });
    if (link) {
      console.log(`Url for Code:${code} : ${link.url}`)
      return {
        longUrl: link.url,
        shortLink: `${process.env.URL}:${process.env.PORT}/r/${link.code}`,
        id: link.id
      }
    }
    return {
      longUrl: null,
      shortLink: null,
      id: null
    }


  }


}
