import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Match } from '../../database/entities/match.entity';
export interface AnonymousProfile {
    id: string;
    age: number;
    location: string;
    interests: string[];
    bio?: string;
}
export interface MatchDecision {
    profileId: string;
    decision: 'like' | 'pass';
    userId: number;
}
export declare class AnonymousMatchingService {
    private readonly usersRepository;
    private readonly matchesRepository;
    constructor(usersRepository: Repository<User>, matchesRepository: Repository<Match>);
    getAnonymousProfiles(userId: number, limit?: number): Promise<AnonymousProfile[]>;
    submitMatchDecision(decision: MatchDecision): Promise<{
        isMatch: boolean;
        matchId?: number;
    }>;
    private userToAnonymousProfile;
    private generateAnonymousId;
    private decodeAnonymousId;
    private anonymizeLocation;
    private extractInterests;
    private anonymizeBio;
}
