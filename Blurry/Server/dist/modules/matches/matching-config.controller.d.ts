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
export declare class MatchingConfigController {
    private readonly matchingConfigService;
    constructor(matchingConfigService: MatchingConfigService);
    testConfiguration(request: MatchingTestRequest): Promise<MatchingTestResult>;
    applyConfiguration(config: {
        ageWeight: number;
        distanceWeight: number;
        interestsWeight: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
