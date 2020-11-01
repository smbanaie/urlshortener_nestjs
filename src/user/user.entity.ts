import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    BeforeInsert,
    OneToMany
  } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { UrlLink } from '../shortener/shortener.entity'

@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn()
    id: number;

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
    password: string;  @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    
    @OneToMany(() => UrlLink, UrlLink => UrlLink.user)
    links: UrlLink[];

    email: string;
    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
