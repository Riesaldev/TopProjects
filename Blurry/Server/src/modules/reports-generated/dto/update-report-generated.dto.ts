import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateReportGeneratedDto {
  @IsOptional()
  @IsString()
  generated_by?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  upupdate?: string;
} 