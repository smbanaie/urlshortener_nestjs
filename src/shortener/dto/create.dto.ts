import { IsAlphanumeric, IsUrl, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class CreateDto {
  @IsUrl()
  @Length(10, 2000)
  @ApiProperty({description:'Required : The Long URL'})
  longUrl: string;


  @IsAlphanumeric()
  @Length(6, 10)
  @IsOptional()
  @ApiPropertyOptional({ description: 'Optional -You  Can Suggest Your Preferred Code',   minLength: 6,  default: null,maxLength:10})
  ShortCode?: string;


  

}
