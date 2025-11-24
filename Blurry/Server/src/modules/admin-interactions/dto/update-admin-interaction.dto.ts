import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateAdminInteractionDto {
  @IsOptional()
  @IsInt()
  sender_id?: number;

  @IsOptional()
  @IsInt()
  receiver_id?: number;

  @IsOptional()
  @IsString()
  message?: string;
} 