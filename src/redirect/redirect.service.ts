import { Injectable } from '@nestjs/common';
import { HttpException,HttpStatus } from '@nestjs/common';
import { CreateAccessInfoDto } from './dto/access.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Accesses } from './access.entity'
import { Repository } from 'typeorm';


@Injectable()
export class RedirectService {
    constructor(
        @InjectRepository(Accesses)    
        private readonly accessRepo: Repository<Accesses>, 
    ){}

    async log_redirect_stats(log: CreateAccessInfoDto): Promise<void> {
        // check if the user exists in the db    
        const result = this.accessRepo.create(log);
        this.accessRepo.save(result);
        return ;
    }



}
