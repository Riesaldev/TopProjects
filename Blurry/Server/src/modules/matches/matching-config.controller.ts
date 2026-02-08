import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MatchingConfigService } from './matching-config.service';

export interface MatchingTestRequest {
  ageWeight: number;
  distanceWeight: number;
  interestsWeight: number;
  testUserId: number;
}

export interface MatchingTestResult {
  matches: Array<{
    userId: number;
    score: number;
    breakdown: {
      ageScore: number;
      distanceScore: number;
      interestsScore: number;
    };
  }>;
  totalMatches: number;
  averageScore: number;
}

@UseGuards(JwtAuthGuard)
@Controller('admin/matching')
export class MatchingConfigController {
  constructor(private readonly matchingConfigService: MatchingConfigService) {}

  @Post('test')
  async testConfiguration(@Body() request: MatchingTestRequest): Promise<MatchingTestResult> {
    return this.matchingConfigService.testConfiguration(request);
  }

  @Post('apply')
  async applyConfiguration(@Body() config: { ageWeight: number; distanceWeight: number; interestsWeight: number }) {
    return this.matchingConfigService.applyConfiguration(config);
  }
}
