import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UpdateStreakDto } from './dto/update-streak.dto';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get()
  get(@Query('userId') userId?: string) {
    if (!userId) {
      return { error: 'userId es requerido' };
    }
    return this.streaksService.getByUser(Number(userId));
  }

  @Post()
  post(@Body() body: UpdateStreakDto) {
    return this.streaksService.registerActivity(Number(body.userId));
  }
}
