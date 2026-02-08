import { IsString, IsOptional } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  updated_by?: string;
} 