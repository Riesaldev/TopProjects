import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    findAll(): Promise<import("../../database/entities/report.entity").Report[]>;
    findOne(id: number): Promise<import("../../database/entities/report.entity").Report>;
    create(createReportDto: CreateReportDto): Promise<import("../../database/entities/report.entity").Report>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<import("../../database/entities/report.entity").Report>;
    remove(id: number): Promise<void>;
}
