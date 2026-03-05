import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProgressMissionDto {
  @IsInt()
  userId: number;

  @IsString()
  action: string;

  @IsOptional()
  @IsInt()
  contactId?: number;
}
