import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../database/entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Contact } from '../../database/entities/contact.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchesRepository.find();
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchesRepository.findOneBy({ id });
    if (!match) throw new NotFoundException('Match not found');
    return match;
  }

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = this.matchesRepository.create(createMatchDto);
    const savedMatch = await this.matchesRepository.save(match);
    // Si es un match mutuo, crear contactos en la agenda de ambos usuarios
    if (createMatchDto.status === 'mutual') {
      await this.contactsRepository.save([
        { user_id: createMatchDto.user_a_id, contact_id: createMatchDto.user_b_id },
        { user_id: createMatchDto.user_b_id, contact_id: createMatchDto.user_a_id },
      ]);
    }
    return savedMatch;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.findOne(id);
    Object.assign(match, updateMatchDto);
    return this.matchesRepository.save(match);
  }

  async remove(id: number): Promise<void> {
    const match = await this.findOne(id);
    await this.matchesRepository.remove(match);
  }
} 