import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  followers?: number = 0;
}
