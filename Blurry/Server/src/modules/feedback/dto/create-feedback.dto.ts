import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  user_id: number;

  @IsInt()
  match_id: number;

  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
} 