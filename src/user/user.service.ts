import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm';
import { UserDto } from './dto/show.dto';
import { toUserDto } from '../shared/mapper'
import { LoginUserDto } from './dto/login.dto'
import { CreateUserDto } from './dto/create.dto'
import { HttpException,HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt'



@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepo: Repository<UserEntity>, 
    ){}
    
    async comparePasswords(p1 : string,p2:string): Promise<Boolean>{
        // console.log(`Compare Pass\n*****************`)
        // console.log(` P1 : ${p1}\n*****************`)
        // console.log(` P2 : ${p2}\n*****************`)
        return bcrypt.compare(p2, p1);
     }

    async findOne(options?: object): Promise<UserDto> {
        const user =  await this.userRepo.findOne(options);    
        return toUserDto(user);  
    }
      
    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepo.findOne({ where: { username } });
        // console.log(`Username Found : ${user.username}\n*****************`)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        
        // compare passwords    
        const areEqual = await this.comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }
    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ 
            where:  { username } });  
    }
    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email } = userDto;
        
        // check if the user exists in the db    
        const userInDb = await this.userRepo.findOne({ 
            where: { username } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const user: UserEntity = await this.userRepo.create({ username, password, email, });
        await this.userRepo.save(user);
        return toUserDto(user);  
    }
    
}
