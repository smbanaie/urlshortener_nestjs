import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
import { Exclude } from 'class-transformer';
import { UserEntity } from '../user/user.entity'

@Entity('links')
export class UrlLink {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000 })
  @Length(10,2000)
  url: string;

  @Exclude()
  @Column()
  user_id: number;

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
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id", referencedColumnName: "id"})
  user: UserEntity;
}
