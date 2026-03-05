import { IsInt } from 'class-validator';

export class ClaimMissionDto {
  @IsInt()
  userId: number;

  @IsInt()
  missionId: number;
}
