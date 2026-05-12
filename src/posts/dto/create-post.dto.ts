import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  caption: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  likes?: number = 0;
}
