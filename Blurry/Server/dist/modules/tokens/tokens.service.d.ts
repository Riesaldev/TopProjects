import { Repository } from 'typeorm';
import { Token } from '../../database/entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
export declare class TokensService {
    private tokensRepository;
    constructor(tokensRepository: Repository<Token>);
    findAll(): Promise<Token[]>;
    findOne(id: number): Promise<Token>;
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    update(id: number, updateTokenDto: UpdateTokenDto): Promise<Token>;
    remove(id: number): Promise<void>;
    accumulate(user_id: number, amount: number, reason: string): Promise<Token>;
    consume(user_id: number, amount: number, reason: string): Promise<Token>;
    reward(user_id: number, amount: number, reason: string): Promise<Token>;
    getBalance(user_id: number): Promise<number>;
}
