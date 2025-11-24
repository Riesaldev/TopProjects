import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from '../../database/entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogsRepository: Repository<ActivityLog>,
  ) {}

  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogsRepository.find();
  }

  async findOne(id: number): Promise<ActivityLog> {
    const log = await this.activityLogsRepository.findOneBy({ id });
    if (!log) throw new NotFoundException('Activity log not found');
    return log;
  }

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const log = this.activityLogsRepository.create(createActivityLogDto);
    return this.activityLogsRepository.save(log);
  }

  async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
    const log = await this.findOne(id);
    Object.assign(log, updateActivityLogDto);
    return this.activityLogsRepository.save(log);
  }

  async remove(id: number): Promise<void> {
    const log = await this.findOne(id);
    await this.activityLogsRepository.remove(log);
  }
} 