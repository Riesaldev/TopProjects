import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateChatMessageDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  contact_id?: number;

  @IsOptional()
  @IsInt()
  sender_id?: number;

  @IsOptional()
  @IsString()
  content?: string;
}
