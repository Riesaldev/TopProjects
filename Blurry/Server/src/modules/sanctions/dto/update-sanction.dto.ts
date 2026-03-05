import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSanctionDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsString()
  sancion?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
