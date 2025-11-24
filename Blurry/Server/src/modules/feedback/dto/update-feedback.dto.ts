import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  match_id?: number;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
} 