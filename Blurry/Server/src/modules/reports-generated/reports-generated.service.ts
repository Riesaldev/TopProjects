import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportGenerated } from '../../database/entities/report-generated.entity';
import { CreateReportGeneratedDto } from './dto/create-report-generated.dto';
import { UpdateReportGeneratedDto } from './dto/update-report-generated.dto';

@Injectable()
export class ReportsGeneratedService {
  constructor(
    @InjectRepository(ReportGenerated)
    private reportsGeneratedRepository: Repository<ReportGenerated>,
  ) {}

  async findAll(): Promise<ReportGenerated[]> {
    return this.reportsGeneratedRepository.find();
  }

  async findOne(id: number): Promise<ReportGenerated> {
    const report = await this.reportsGeneratedRepository.findOneBy({ id });
    if (!report) throw new NotFoundException('Report generated not found');
    return report;
  }

  async create(createReportGeneratedDto: CreateReportGeneratedDto): Promise<ReportGenerated> {
    const report = this.reportsGeneratedRepository.create(createReportGeneratedDto);
    return this.reportsGeneratedRepository.save(report);
  }

  async update(id: number, updateReportGeneratedDto: UpdateReportGeneratedDto): Promise<ReportGenerated> {
    const report = await this.findOne(id);
    Object.assign(report, updateReportGeneratedDto);
    return this.reportsGeneratedRepository.save(report);
  }

  async remove(id: number): Promise<void> {
    const report = await this.findOne(id);
    await this.reportsGeneratedRepository.remove(report);
  }
} 