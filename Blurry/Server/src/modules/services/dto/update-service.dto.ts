import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
