import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Setting } from '../../database/entities/setting.entity';
import { MatchingTestRequest, MatchingTestResult } from './matching-config.controller';
export declare class MatchingConfigService {
    private readonly usersRepository;
    private readonly settingsRepository;
    constructor(usersRepository: Repository<User>, settingsRepository: Repository<Setting>);
    testConfiguration(request: MatchingTestRequest): Promise<MatchingTestResult>;
    applyConfiguration(config: {
        ageWeight: number;
        distanceWeight: number;
        interestsWeight: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    private saveOrUpdateSetting;
    private calculateAgeCompatibility;
    private calculateDistanceCompatibility;
    private calculateInterestsCompatibility;
}
