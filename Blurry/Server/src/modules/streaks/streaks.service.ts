import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Streak } from '../../database/entities/streak.entity';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

@Injectable()
export class StreaksService {
  constructor(
    @InjectRepository(Streak)
    private streaksRepository: Repository<Streak>,
  ) {}

  async getByUser(userId: number) {
    const streak = await this.streaksRepository.findOne({ where: { user_id: userId } });
    if (!streak) {
      return {
        userId,
        currentStreak: 0,
        maxStreak: 0,
        lastActivity: null,
      };
    }

    return {
      userId: streak.user_id,
      currentStreak: streak.current_streak,
      maxStreak: streak.max_streak,
      lastActivity: streak.last_activity,
    };
  }

  async registerActivity(userId: number) {
    const today = todayStr();
    let streak = await this.streaksRepository.findOne({ where: { user_id: userId } });

    if (!streak) {
      streak = this.streaksRepository.create({
        user_id: userId,
        current_streak: 1,
        max_streak: 1,
        last_activity: today,
      });
      await this.streaksRepository.save(streak);
      return this.getByUser(userId);
    }

    if (streak.last_activity === today) {
      return this.getByUser(userId);
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().slice(0, 10);

    streak.current_streak = streak.last_activity === y ? streak.current_streak + 1 : 1;
    streak.max_streak = Math.max(streak.max_streak, streak.current_streak);
    streak.last_activity = today;
    await this.streaksRepository.save(streak);

    return this.getByUser(userId);
  }
}
