import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("../../database/entities/setting.entity").Setting[]>;
    findOne(id: number): Promise<import("../../database/entities/setting.entity").Setting>;
    create(createSettingDto: CreateSettingDto): Promise<import("../../database/entities/setting.entity").Setting>;
    update(id: number, updateSettingDto: UpdateSettingDto): Promise<import("../../database/entities/setting.entity").Setting>;
    remove(id: number): Promise<void>;
}
