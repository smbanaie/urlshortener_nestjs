import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsIP} from "class-validator";
import { Exclude } from 'class-transformer';
import { UrlLink } from '../shortener/shortener.entity'

@Entity('accesses')
export class Accesses {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000,name: 'referrer_url' })
  referrerURL: string;

  @Exclude()
  @Column()
  link_id: number;

  @Column({ length: 2000, name: 'user_agent'})
  userAgent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ length: 100})
  @IsIP()
  ip: string;
  
  @Column({ length: 50})
  browser: string;

  @Column({ length: 50})
  os: string;

  @Column({ length: 50, name :'agent_type'})
  device: string;

  @ManyToOne(() => UrlLink)
  @JoinColumn({ name: "link_id", referencedColumnName: "id"})
  link: UrlLink;
}
