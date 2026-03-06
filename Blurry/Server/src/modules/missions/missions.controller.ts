import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClaimMissionDto } from './dto/claim-mission.dto';
import { ProgressMissionDto } from './dto/progress-mission.dto';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  get(@Query('userId') userId?: string) {
    const parsedUserId = userId ? Number(userId) : NaN;
    if (!userId || !Number.isFinite(parsedUserId) || parsedUserId <= 0) {
      return { missions: [], userProgress: [] };
    }
    return this.missionsService.getForUser(parsedUserId);
  }

  @Post('claim')
  claim(@Body() claimMissionDto: ClaimMissionDto) {
    return this.missionsService.claim(claimMissionDto);
  }

  @Post('progress')
  progress(@Body() progressMissionDto: ProgressMissionDto) {
    return this.missionsService.progress(progressMissionDto);
  }
}
