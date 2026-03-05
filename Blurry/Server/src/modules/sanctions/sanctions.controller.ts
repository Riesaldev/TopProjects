import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateSanctionDto } from './dto/create-sanction.dto';
import { UpdateSanctionDto } from './dto/update-sanction.dto';
import { SanctionsService } from './sanctions.service';

@Controller('sanctions')
export class SanctionsController {
  constructor(private readonly sanctionsService: SanctionsService) {}

  @Get()
  findAll() {
    return this.sanctionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sanctionsService.findOne(id);
  }

  @Post()
  create(@Body() createSanctionDto: CreateSanctionDto) {
    return this.sanctionsService.create(createSanctionDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSanctionDto: UpdateSanctionDto) {
    return this.sanctionsService.update(id, updateSanctionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sanctionsService.remove(id);
  }
}
