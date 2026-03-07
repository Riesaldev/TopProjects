import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../database/entities/match.entity';
import { User } from '../../database/entities/user.entity';
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
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async handleSwipe(userIdA: number, userIdB: number, action: 'like' | 'dislike' | 'superlike'): Promise<{ matched: boolean, match?: Match }> {
    if (userIdA === userIdB) {
      throw new BadRequestException("Cannot swipe on yourself");
    }

    // Handle token deduction for superlike
    if (action === 'superlike') {
      const userA = await this.usersRepository.findOneBy({ id: userIdA });
      if (!userA) throw new NotFoundException('User not found');
      if (userA.tokens < 1) {
        throw new BadRequestException('Not enough tokens for a superlike');
      }
      userA.tokens -= 1;
      await this.usersRepository.save(userA);
    }

    if (action === 'dislike') {
      const match = this.matchesRepository.create({
        user_a_id: userIdA,
        user_b_id: userIdB,
        status: 'rejected',
        score: 0,
      });
      await this.matchesRepository.save(match);
      return { matched: false };
    }

    // Checking if userB already liked userA
    const existingMatch = await this.matchesRepository.findOne({
      where: { user_a_id: userIdB, user_b_id: userIdA, status: 'pending' }
    });

    if (existingMatch) {
      // It's a mutual match!
      existingMatch.status = 'mutual';
      await this.matchesRepository.save(existingMatch);

      // Create contacts for chat
      await this.contactsRepository.save([
        { user_id: userIdA, contact_id: userIdB },
        { user_id: userIdB, contact_id: userIdA },
      ]);

      return { matched: true, match: existingMatch };
    } else {
      // Create pending match
      const match = this.matchesRepository.create({
        user_a_id: userIdA,
        user_b_id: userIdB,
        status: 'pending',
        score: action === 'superlike' ? 100 : 50,
      });
      await this.matchesRepository.save(match);
      return { matched: false };
    }
  }

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