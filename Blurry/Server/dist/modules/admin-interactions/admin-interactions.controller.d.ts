import { AdminInteractionsService } from './admin-interactions.service';
import { CreateAdminInteractionDto } from './dto/create-admin-interaction.dto';
import { UpdateAdminInteractionDto } from './dto/update-admin-interaction.dto';
export declare class AdminInteractionsController {
    private readonly adminInteractionsService;
    constructor(adminInteractionsService: AdminInteractionsService);
    findAll(): Promise<import("../../database/entities/admin-interaction.entity").AdminInteraction[]>;
    findOne(id: number): Promise<import("../../database/entities/admin-interaction.entity").AdminInteraction>;
    create(createAdminInteractionDto: CreateAdminInteractionDto): Promise<import("../../database/entities/admin-interaction.entity").AdminInteraction>;
    update(id: number, updateAdminInteractionDto: UpdateAdminInteractionDto): Promise<import("../../database/entities/admin-interaction.entity").AdminInteraction>;
    remove(id: number): Promise<void>;
}
