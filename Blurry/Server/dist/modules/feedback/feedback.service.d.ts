import { Repository } from 'typeorm';
import { Feedback } from '../../database/entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackService {
    private feedbackRepository;
    constructor(feedbackRepository: Repository<Feedback>);
    findAll(): Promise<Feedback[]>;
    findOne(id: number): Promise<Feedback>;
    create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback>;
    remove(id: number): Promise<void>;
}
