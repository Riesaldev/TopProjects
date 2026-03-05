import { IsInt } from 'class-validator';

export class ClaimAchievementDto {
  @IsInt()
  userId: number;

  @IsInt()
  achievementId: number;
}
