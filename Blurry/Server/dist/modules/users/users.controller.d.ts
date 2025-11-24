import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../../database/entities/user.entity").User[]>;
    findOne(id: number): Promise<import("../../database/entities/user.entity").User>;
    create(createUserDto: CreateUserDto): Promise<import("../../database/entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../../database/entities/user.entity").User>;
    suspend(id: number, body: {
        reason?: string;
        days?: number;
    }): Promise<import("../../database/entities/user.entity").User>;
    unsuspend(id: number): Promise<import("../../database/entities/user.entity").User>;
    remove(id: number): Promise<void>;
}
