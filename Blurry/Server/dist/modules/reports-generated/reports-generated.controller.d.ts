import { ReportsGeneratedService } from './reports-generated.service';
import { CreateReportGeneratedDto } from './dto/create-report-generated.dto';
import { UpdateReportGeneratedDto } from './dto/update-report-generated.dto';
export declare class ReportsGeneratedController {
    private readonly reportsGeneratedService;
    constructor(reportsGeneratedService: ReportsGeneratedService);
    findAll(): Promise<import("../../database/entities/report-generated.entity").ReportGenerated[]>;
    findOne(id: number): Promise<import("../../database/entities/report-generated.entity").ReportGenerated>;
    create(createReportGeneratedDto: CreateReportGeneratedDto): Promise<import("../../database/entities/report-generated.entity").ReportGenerated>;
    update(id: number, updateReportGeneratedDto: UpdateReportGeneratedDto): Promise<import("../../database/entities/report-generated.entity").ReportGenerated>;
    remove(id: number): Promise<void>;
}
