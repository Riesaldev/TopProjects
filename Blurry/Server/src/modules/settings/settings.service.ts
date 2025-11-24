import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../../database/entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return this.settingsRepository.find();
  }

  async findOne(id: number): Promise<Setting> {
    const setting = await this.settingsRepository.findOneBy({ id });
    if (!setting) throw new NotFoundException('Setting not found');
    return setting;
  }

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const setting = this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(setting);
  }

  async update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting> {
    const setting = await this.findOne(id);
    Object.assign(setting, updateSettingDto);
    return this.settingsRepository.save(setting);
  }

  async remove(id: number): Promise<void> {
    const setting = await this.findOne(id);
    await this.settingsRepository.remove(setting);
  }
} 