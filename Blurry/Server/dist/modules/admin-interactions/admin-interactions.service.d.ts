import { Repository } from 'typeorm';
import { AdminInteraction } from '../../database/entities/admin-interaction.entity';
import { CreateAdminInteractionDto } from './dto/create-admin-interaction.dto';
import { UpdateAdminInteractionDto } from './dto/update-admin-interaction.dto';
export declare class AdminInteractionsService {
    private adminInteractionsRepository;
    constructor(adminInteractionsRepository: Repository<AdminInteraction>);
    findAll(): Promise<AdminInteraction[]>;
    findOne(id: number): Promise<AdminInteraction>;
    create(createAdminInteractionDto: CreateAdminInteractionDto): Promise<AdminInteraction>;
    update(id: number, updateAdminInteractionDto: UpdateAdminInteractionDto): Promise<AdminInteraction>;
    remove(id: number): Promise<void>;
}
