import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['game', 'test'])
  category?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
