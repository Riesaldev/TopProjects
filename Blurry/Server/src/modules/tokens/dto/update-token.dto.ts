import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateTokenDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  amount?: number;

  @IsOptional()
  @IsString()
  reason?: string;
} 