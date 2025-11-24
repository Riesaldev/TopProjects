import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  user_a_id: number;

  @IsInt()
  user_b_id: number;

  @IsOptional()
  @IsInt()
  score?: number;

  @IsString()
  status: string;
} 