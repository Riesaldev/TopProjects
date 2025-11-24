import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    findAll(): Promise<import("../../database/entities/feedback.entity").Feedback[]>;
    findOne(id: number): Promise<import("../../database/entities/feedback.entity").Feedback>;
    create(createFeedbackDto: CreateFeedbackDto): Promise<import("../../database/entities/feedback.entity").Feedback>;
    update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<import("../../database/entities/feedback.entity").Feedback>;
    remove(id: number): Promise<void>;
}
