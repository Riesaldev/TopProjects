import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsInt()
  reported_user_id: number;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  admin_notes?: string;
} 