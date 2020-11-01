import * as ShortId from 'shortid';
import { HttpException, HttpStatus } from '@nestjs/common'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlLink } from './shortener.entity';
import { CreateDto } from './dto/create.dto';
import { ShowDto } from './dto/show.dto'

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(UrlLink)
    private readonly repo: Repository<UrlLink>,
  ) { }

  async create(dto: CreateDto): Promise<ShowDto> {

    try {
      let existingCode = null;
      let shortCode: string;
      do {
        shortCode = (ShortId.generate()).replace(/[^\w\d]/, '').substring(0, 6)
        existingCode = await this.repo.findOne({ where: { code: shortCode } });
        console.log(`Existing : ${existingCode}`);
      } while (existingCode != undefined);

      const link = this.repo.create({
        url: dto.longUrl,
        code: shortCode,
      });

      const created = await this.repo.save(link);

      let obj = new ShowDto
      obj.longUrl = link.url
      obj.shortLink = `${process.env.URL}:${process.env.PORT}/${link.code}`

      return obj;
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error : ${err}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}


