import * as ShortId from 'shortid';
import { HttpException, HttpStatus } from '@nestjs/common'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlLink } from './shortener.entity';
import { CreateShortLinkDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto'
import { UserDto } from '../user/dto/show.dto';


@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(UrlLink)
    private readonly repo: Repository<UrlLink>,
  ) { }

  async create({id} : UserDto ,createLinkDto: CreateShortLinkDto): Promise<ShowDto> {


    let existingCode = null;
    let shortCode = createLinkDto.ShortCode;
    if (shortCode) {
      existingCode = await this.repo.findOne({ where: { code: shortCode } });
      if (existingCode) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: `Error - The provided Short Code :  ${shortCode} is Already Exist. Try With a New One!`,
        }, HttpStatus.CONFLICT);
      }
    }
    else do {
      shortCode = (ShortId.generate()).replace(/[^\w\d]/, '').replace('_', '').substring(0, 6)
      existingCode = await this.repo.findOne({ where: { code: shortCode } });
      console.log(`Existing : ${existingCode}`);
    } while (existingCode != undefined);


    
    const link = this.repo.create({
      url: createLinkDto.longUrl,
      code: shortCode,
      user_id : id,
    });

    const created = await this.repo.save(link);

    let obj = new ShowDto
    obj.longUrl = link.url
    obj.shortLink = `${process.env.URL}:${process.env.PORT}/${link.code}`

    return obj;

  }
}
