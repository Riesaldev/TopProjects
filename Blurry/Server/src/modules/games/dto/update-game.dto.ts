import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['game', 'test'])
  category?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
