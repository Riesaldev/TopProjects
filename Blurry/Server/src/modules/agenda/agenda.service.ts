import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendaEvent } from '../../database/entities/agenda-event.entity';
import { CreateAgendaEventDto } from './dto/create-agenda-event.dto';
import { UpdateAgendaEventDto } from './dto/update-agenda-event.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(AgendaEvent)
    private agendaRepository: Repository<AgendaEvent>,
  ) {}

  async findAll(userId?: number): Promise<AgendaEvent[]> {
    if (typeof userId === 'number' && !Number.isNaN(userId)) {
      return this.agendaRepository.find({ where: { user_id: userId }, order: { datetime: 'ASC' } });
    }
    return this.agendaRepository.find({ order: { datetime: 'ASC' } });
  }

  async findOne(id: number): Promise<AgendaEvent> {
    const event = await this.agendaRepository.findOneBy({ id });
    if (!event) throw new NotFoundException('Agenda event not found');
    return event;
  }

  async create(createAgendaEventDto: CreateAgendaEventDto): Promise<AgendaEvent> {
    const event = this.agendaRepository.create({
      ...createAgendaEventDto,
      datetime: new Date(createAgendaEventDto.datetime),
      completed: createAgendaEventDto.completed || false,
    });
    return this.agendaRepository.save(event);
  }

  async update(id: number, updateAgendaEventDto: UpdateAgendaEventDto): Promise<AgendaEvent> {
    const event = await this.findOne(id);
    Object.assign(event, {
      ...updateAgendaEventDto,
      datetime: updateAgendaEventDto.datetime ? new Date(updateAgendaEventDto.datetime) : event.datetime,
    });
    return this.agendaRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.agendaRepository.remove(event);
  }
}
