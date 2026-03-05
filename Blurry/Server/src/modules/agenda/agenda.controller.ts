import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaEventDto } from './dto/create-agenda-event.dto';
import { UpdateAgendaEventDto } from './dto/update-agenda-event.dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    const parsedUserId = userId ? Number(userId) : undefined;
    return this.agendaService.findAll(parsedUserId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendaService.findOne(id);
  }

  @Post()
  create(@Body() createAgendaEventDto: CreateAgendaEventDto) {
    return this.agendaService.create(createAgendaEventDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAgendaEventDto: UpdateAgendaEventDto) {
    return this.agendaService.update(id, updateAgendaEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendaService.remove(id);
  }
}
