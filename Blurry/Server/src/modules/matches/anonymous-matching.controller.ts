import { Controller, Get, Post, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnonymousMatchingService, MatchDecision } from './anonymous-matching.service';

@UseGuards(JwtAuthGuard)
@Controller('matching/anonymous')
export class AnonymousMatchingController {
  constructor(private readonly anonymousMatchingService: AnonymousMatchingService) {}

  @Get('profiles')
  async getAnonymousProfiles(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('limit', ParseIntPipe) limit: number = 10
  ) {
    return this.anonymousMatchingService.getAnonymousProfiles(userId, limit);
  }

  @Post('decide')
  async submitDecision(@Body() decision: MatchDecision) {
    return this.anonymousMatchingService.submitMatchDecision(decision);
  }
}
