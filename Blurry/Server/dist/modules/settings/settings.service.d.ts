import { Repository } from 'typeorm';
import { Setting } from '../../database/entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<Setting>);
    findAll(): Promise<Setting[]>;
    findOne(id: number): Promise<Setting>;
    create(createSettingDto: CreateSettingDto): Promise<Setting>;
    update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting>;
    remove(id: number): Promise<void>;
}
