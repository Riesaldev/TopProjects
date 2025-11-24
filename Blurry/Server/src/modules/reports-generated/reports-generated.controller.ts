import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReportsGeneratedService } from './reports-generated.service';
import { CreateReportGeneratedDto } from './dto/create-report-generated.dto';
import { UpdateReportGeneratedDto } from './dto/update-report-generated.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reports-generated')
export class ReportsGeneratedController {
  constructor(private readonly reportsGeneratedService: ReportsGeneratedService) {}

  @Get()
  findAll() {
    return this.reportsGeneratedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsGeneratedService.findOne(id);
  }

  @Post()
  create(@Body() createReportGeneratedDto: CreateReportGeneratedDto) {
    return this.reportsGeneratedService.create(createReportGeneratedDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportGeneratedDto: UpdateReportGeneratedDto) {
    return this.reportsGeneratedService.update(id, updateReportGeneratedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportsGeneratedService.remove(id);
  }
} 