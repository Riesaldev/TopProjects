import { IsInt, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsInt()
  user_id: number;

  @IsInt()
  contact_id: number;

  @IsInt()
  sender_id: number;

  @IsString()
  content: string;
}
