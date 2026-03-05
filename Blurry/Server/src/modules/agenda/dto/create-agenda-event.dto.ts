import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAgendaEventDto {
  @IsInt()
  user_id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  datetime: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  contact_id?: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
