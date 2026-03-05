import { IsInt } from 'class-validator';

export class UpdateStreakDto {
  @IsInt()
  userId: number;
}
