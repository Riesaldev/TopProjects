import { Repository } from 'typeorm';
import { ReportGenerated } from '../../database/entities/report-generated.entity';
import { CreateReportGeneratedDto } from './dto/create-report-generated.dto';
import { UpdateReportGeneratedDto } from './dto/update-report-generated.dto';
export declare class ReportsGeneratedService {
    private reportsGeneratedRepository;
    constructor(reportsGeneratedRepository: Repository<ReportGenerated>);
    findAll(): Promise<ReportGenerated[]>;
    findOne(id: number): Promise<ReportGenerated>;
    create(createReportGeneratedDto: CreateReportGeneratedDto): Promise<ReportGenerated>;
    update(id: number, updateReportGeneratedDto: UpdateReportGeneratedDto): Promise<ReportGenerated>;
    remove(id: number): Promise<void>;
}
