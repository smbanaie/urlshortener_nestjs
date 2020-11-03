import { IsAlphanumeric, IsUrl, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class CreateAccessInfoDto {

  @IsUrl()
  @ApiPropertyOptional()
  referrerURL?: string;

  @ApiProperty()
  link_id: number;

  @ApiProperty()
  userAgent: string;

  @ApiProperty()
  ip: string;

  @ApiProperty()
  device: string;

  @ApiProperty()
  browser: string;

  
  @ApiProperty()
  os: string;
  
}
