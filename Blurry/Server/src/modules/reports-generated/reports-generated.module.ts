import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportGenerated } from '../../database/entities/report-generated.entity';
import { ReportsGeneratedService } from './reports-generated.service';
import { ReportsGeneratedController } from './reports-generated.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReportGenerated])],
  controllers: [ReportsGeneratedController],
  providers: [ReportsGeneratedService],
  exports: [ReportsGeneratedService],
})
export class ReportsGeneratedModule {} 