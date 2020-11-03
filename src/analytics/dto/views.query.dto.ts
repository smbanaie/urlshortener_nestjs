import { IsAlphanumeric, IsUrl, Length, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UrlViewQueryDto {
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsOptional()
  day: string;


  @IsNumber()
  @IsOptional()
  hour: string;
}
  
