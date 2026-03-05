import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { ClaimAchievementDto } from './dto/claim-achievement.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  find(@Query('userId') userId?: string) {
    if (userId) {
      return this.achievementsService.findByUser(Number(userId));
    }
    return this.achievementsService.findAll();
  }

  @Get('list')
  list() {
    return this.achievementsService.findAll();
  }

  @Post('claim')
  claim(@Body() claimAchievementDto: ClaimAchievementDto) {
    return this.achievementsService.claim(claimAchievementDto);
  }

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }
}
