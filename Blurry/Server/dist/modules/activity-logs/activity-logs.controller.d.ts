import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
export declare class ActivityLogsController {
    private readonly activityLogsService;
    constructor(activityLogsService: ActivityLogsService);
    findAll(): Promise<import("../../database/entities/activity-log.entity").ActivityLog[]>;
    findOne(id: number): Promise<import("../../database/entities/activity-log.entity").ActivityLog>;
    create(createActivityLogDto: CreateActivityLogDto): Promise<import("../../database/entities/activity-log.entity").ActivityLog>;
    update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<import("../../database/entities/activity-log.entity").ActivityLog>;
    remove(id: number): Promise<void>;
}
