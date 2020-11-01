import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne
} from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
import { Exclude } from 'class-transformer';
import { UserEntity } from '../user/user.entity'

@Entity('links')
export class UrlLink {
  @Exclude()
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ length: 2000 })
  @Length(10,2000)
  url: string;

  // @Exclude()
  // @Column({ length: 32, name: 'url_hash' })
  // urlHash: string;

  @Exclude()
  @Column({ length: 10 })
  @Length(6,10)
  code: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  get shortLink(): string {
    return `${process.env.URL}:${process.env.PORT}/{ $code }`;
  }

  @Exclude()
  @ManyToOne(() => UserEntity, UserEntity => UserEntity.links)
    user: UserEntity;
}
