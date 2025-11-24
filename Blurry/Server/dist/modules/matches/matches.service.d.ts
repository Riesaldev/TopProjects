import { Repository } from 'typeorm';
import { Match } from '../../database/entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Contact } from '../../database/entities/contact.entity';
export declare class MatchesService {
    private matchesRepository;
    private contactsRepository;
    constructor(matchesRepository: Repository<Match>, contactsRepository: Repository<Contact>);
    findAll(): Promise<Match[]>;
    findOne(id: number): Promise<Match>;
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match>;
    remove(id: number): Promise<void>;
}
