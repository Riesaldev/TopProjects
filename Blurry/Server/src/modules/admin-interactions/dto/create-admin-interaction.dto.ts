import { IsInt, IsString } from 'class-validator';

export class CreateAdminInteractionDto {
  @IsInt()
  sender_id: number;

  @IsInt()
  receiver_id: number;

  @IsString()
  message: string;
} 