import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchingService } from './matching.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly matchingAlgorithmService: MatchingService
  ) {}

  @Post('swipe')
  async handleSwipe(@Body() body: { userIdA: number, userIdB: number, action: 'like' | 'dislike' | 'superlike' }) {
    return this.matchesService.handleSwipe(body.userIdA, body.userIdB, body.action);
  }

  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId', ParseIntPipe) userId: number) {
    return this.matchingAlgorithmService.getRecommendations(userId);
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.findOne(id);
  }

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.remove(id);
  }
} 