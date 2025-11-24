import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    findAll(): Promise<import("../../database/entities/token.entity").Token[]>;
    findOne(id: number): Promise<import("../../database/entities/token.entity").Token>;
    create(createTokenDto: CreateTokenDto): Promise<import("../../database/entities/token.entity").Token>;
    update(id: number, updateTokenDto: UpdateTokenDto): Promise<import("../../database/entities/token.entity").Token>;
    remove(id: number): Promise<void>;
    accumulate(body: {
        user_id: number;
        amount: number;
        reason: string;
    }): Promise<import("../../database/entities/token.entity").Token>;
    consume(body: {
        user_id: number;
        amount: number;
        reason: string;
    }): Promise<import("../../database/entities/token.entity").Token>;
    reward(body: {
        user_id: number;
        amount: number;
        reason: string;
    }): Promise<import("../../database/entities/token.entity").Token>;
    getBalance(user_id: number): Promise<number>;
}
