import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../../database/entities/achievement.entity';
import { UserAchievement } from '../../database/entities/user-achievement.entity';
import { User } from '../../database/entities/user.entity';
import { ClaimAchievementDto } from './dto/claim-achievement.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private achievementsRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private userAchievementsRepository: Repository<UserAchievement>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.achievementsRepository.find({ order: { id: 'ASC' } });
  }

  async findByUser(userId: number) {
    return this.userAchievementsRepository.find({ where: { user_id: userId }, order: { date: 'DESC' } });
  }

  async create(createAchievementDto: CreateAchievementDto) {
    const achievement = this.achievementsRepository.create({
      ...createAchievementDto,
      token_reward: createAchievementDto.token_reward || 0,
      secret: createAchievementDto.secret || false,
    });
    return this.achievementsRepository.save(achievement);
  }

  async claim(claimAchievementDto: ClaimAchievementDto) {
    const existing = await this.userAchievementsRepository.findOne({
      where: {
        user_id: claimAchievementDto.userId,
        achievement_id: claimAchievementDto.achievementId,
      },
    });

    if (existing) {
      throw new ConflictException('Ya tienes este logro');
    }

    const achievement = await this.achievementsRepository.findOneBy({ id: claimAchievementDto.achievementId });
    if (!achievement) {
      throw new NotFoundException('Logro no encontrado');
    }

    const userAchievement = this.userAchievementsRepository.create({
      user_id: claimAchievementDto.userId,
      achievement_id: claimAchievementDto.achievementId,
    });
    const saved = await this.userAchievementsRepository.save(userAchievement);

    const user = await this.usersRepository.findOneBy({ id: claimAchievementDto.userId });
    if (user) {
      user.tokens = (user.tokens || 0) + (achievement.token_reward || 0);
      await this.usersRepository.save(user);
    }

    return {
      success: true,
      achievement: saved,
      tokens: achievement.token_reward || 0,
    };
  }
}
