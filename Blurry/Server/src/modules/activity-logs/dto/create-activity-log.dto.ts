import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateActivityLogDto {
  @IsInt()
  user_id: number;

  @IsString()
  action: string;

  @IsOptional()
  metadata?: any;
} 