import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReportGeneratedDto {
  @IsString()
  generated_by: string;

  @IsString()
  type: string;

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  upupdate?: string;
} 