import { Repository } from 'typeorm';
import { Notification } from '../../database/entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    remove(id: number): Promise<void>;
}
