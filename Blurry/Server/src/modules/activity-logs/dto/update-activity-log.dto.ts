import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateActivityLogDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  metadata?: any;
} 