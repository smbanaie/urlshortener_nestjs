import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    CreateDateColumn,
    Column,
    BeforeInsert,
    OneToMany,
    JoinColumn
    
  } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { UrlLink } from '../shortener/shortener.entity'
import { Exclude } from 'class-transformer';


@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string;  
    
    
    @Column({ 
        type: 'varchar', 
        nullable: false ,
        unique: true 
    }) 
    email: string;
    
    @Exclude()
    @OneToMany(() => UrlLink, UrlLink => UrlLink.user)
    links!: UrlLink[];


    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
