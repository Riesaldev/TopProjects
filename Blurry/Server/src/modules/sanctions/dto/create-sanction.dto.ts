import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSanctionDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  usuario?: string;

  @IsString()
  sancion: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
