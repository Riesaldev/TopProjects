import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateReportDto {
  @IsOptional()
  @IsInt()
  reported_user_id?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  admin_notes?: string;
} 