import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsInt()
  user_a_id?: number;

  @IsOptional()
  @IsInt()
  user_b_id?: number;

  @IsOptional()
  @IsInt()
  score?: number;

  @IsOptional()
  @IsString()
  status?: string;
} 