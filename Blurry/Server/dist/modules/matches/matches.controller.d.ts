import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    findAll(): Promise<import("../../database/entities/match.entity").Match[]>;
    findOne(id: number): Promise<import("../../database/entities/match.entity").Match>;
    create(createMatchDto: CreateMatchDto): Promise<import("../../database/entities/match.entity").Match>;
    update(id: number, updateMatchDto: UpdateMatchDto): Promise<import("../../database/entities/match.entity").Match>;
    remove(id: number): Promise<void>;
}
