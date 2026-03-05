import { IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
