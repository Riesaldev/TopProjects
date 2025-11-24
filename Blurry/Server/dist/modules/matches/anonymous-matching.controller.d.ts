import { AnonymousMatchingService, MatchDecision } from './anonymous-matching.service';
export declare class AnonymousMatchingController {
    private readonly anonymousMatchingService;
    constructor(anonymousMatchingService: AnonymousMatchingService);
    getAnonymousProfiles(userId: number, limit?: number): Promise<import("./anonymous-matching.service").AnonymousProfile[]>;
    submitDecision(decision: MatchDecision): Promise<{
        isMatch: boolean;
        matchId?: number;
    }>;
}
