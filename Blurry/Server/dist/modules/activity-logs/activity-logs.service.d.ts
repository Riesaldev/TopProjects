import { Repository } from 'typeorm';
import { ActivityLog } from '../../database/entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
export declare class ActivityLogsService {
    private activityLogsRepository;
    constructor(activityLogsRepository: Repository<ActivityLog>);
    findAll(): Promise<ActivityLog[]>;
    findOne(id: number): Promise<ActivityLog>;
    create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog>;
    update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog>;
    remove(id: number): Promise<void>;
}
