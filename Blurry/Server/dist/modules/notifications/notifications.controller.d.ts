import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(): Promise<import("../../database/entities/notification.entity").Notification[]>;
    findOne(id: number): Promise<import("../../database/entities/notification.entity").Notification>;
    create(createNotificationDto: CreateNotificationDto): Promise<import("../../database/entities/notification.entity").Notification>;
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<import("../../database/entities/notification.entity").Notification>;
    remove(id: number): Promise<void>;
}
