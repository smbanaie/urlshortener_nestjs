import { IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class CreateDto {
  @IsUrl()
  @Length(1, 2000)
  @ApiProperty()
  longUrl: string;
}
