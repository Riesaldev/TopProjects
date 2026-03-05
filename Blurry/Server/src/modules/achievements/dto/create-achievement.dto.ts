import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  token_reward?: number;

  @IsOptional()
  @IsBoolean()
  secret?: boolean;
}
