import { IsInt, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsInt()
  user_id: number;

  @IsInt()
  amount: number;

  @IsString()
  reason: string;
} 