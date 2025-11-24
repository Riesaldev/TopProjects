import { Repository } from 'typeorm';
import { Report } from '../../database/entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsService {
    private reportsRepository;
    constructor(reportsRepository: Repository<Report>);
    findAll(): Promise<Report[]>;
    findOne(id: number): Promise<Report>;
    create(createReportDto: CreateReportDto): Promise<Report>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<Report>;
    remove(id: number): Promise<void>;
}
