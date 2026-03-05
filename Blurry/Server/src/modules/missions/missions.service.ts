import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from '../../database/entities/mission.entity';
import { UserMission } from '../../database/entities/user-mission.entity';
import { User } from '../../database/entities/user.entity';
import { Streak } from '../../database/entities/streak.entity';
import { ClaimMissionDto } from './dto/claim-mission.dto';
import { ProgressMissionDto } from './dto/progress-mission.dto';

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentWeekStr() {
  const d = new Date();
  const year = d.getFullYear();
  const firstDay = new Date(year, 0, 1);
  const days = Math.floor((d.getTime() - firstDay.getTime()) / 86400000);
  const week = Math.ceil((days + firstDay.getDay() + 1) / 7);
  return `${year}-W${week}`;
}

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionsRepository: Repository<Mission>,
    @InjectRepository(UserMission)
    private userMissionsRepository: Repository<UserMission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Streak)
    private streaksRepository: Repository<Streak>,
  ) {}

  private async assignIfMissing(userId: number): Promise<void> {
    const missions = await this.missionsRepository.find();
    const userMissions = await this.userMissionsRepository.find({ where: { user_id: userId } });
    const today = getTodayStr();
    const week = getCurrentWeekStr();

    const dailyMissions = missions.filter((m) => m.type === 'diaria');
    const weeklyMissions = missions.filter((m) => m.type === 'semanal');

    const assignedDailyToday = userMissions.filter(
      (um) => um.assigned_at.slice(0, 10) === today && dailyMissions.some((m) => m.id === um.mission_id),
    );
    const assignedWeekly = userMissions.filter(
      (um) => um.assigned_at.startsWith(week) && weeklyMissions.some((m) => m.id === um.mission_id),
    );

    const toInsert: UserMission[] = [];

    if (assignedDailyToday.length < 2) {
      for (const m of dailyMissions) {
        if (assignedDailyToday.some((um) => um.mission_id === m.id)) continue;
        toInsert.push(
          this.userMissionsRepository.create({
            user_id: userId,
            mission_id: m.id,
            progress: 0,
            completed: false,
            assigned_at: today,
          }),
        );
        if (assignedDailyToday.length + toInsert.length >= 2) break;
      }
    }

    if (assignedWeekly.length < 1) {
      const m = weeklyMissions.find((wm) => !assignedWeekly.some((um) => um.mission_id === wm.id));
      if (m) {
        toInsert.push(
          this.userMissionsRepository.create({
            user_id: userId,
            mission_id: m.id,
            progress: 0,
            completed: false,
            assigned_at: week,
          }),
        );
      }
    }

    if (toInsert.length) {
      await this.userMissionsRepository.save(toInsert);
    }
  }

  async getForUser(userId: number) {
    await this.assignIfMissing(userId);

    const missions = await this.missionsRepository.find();
    const userMissions = await this.userMissionsRepository.find({ where: { user_id: userId } });
    const today = getTodayStr();
    const week = getCurrentWeekStr();

    const userProgress = userMissions.filter((um) => {
      const m = missions.find((mission) => mission.id === um.mission_id);
      if (!m) return false;
      if (m.type === 'diaria') return um.assigned_at.slice(0, 10) === today;
      if (m.type === 'semanal') return um.assigned_at.startsWith(week);
      if (m.secret) return um.completed;
      return false;
    });

    return {
      missions: missions.map((m) => ({
        id: m.id,
        type: m.type,
        description: m.description,
        goal: m.goal,
        action: m.action,
        reward: { tokens: m.reward_tokens },
        secret: m.secret,
      })),
      userProgress: userProgress.map((um) => ({
        userId: um.user_id,
        missionId: um.mission_id,
        progress: um.progress,
        completed: um.completed,
        assignedAt: um.assigned_at,
        completedAt: um.completed_at ? um.completed_at.toISOString() : null,
      })),
    };
  }

  async claim(claimMissionDto: ClaimMissionDto) {
    const mission = await this.missionsRepository.findOneBy({ id: claimMissionDto.missionId });
    const userMission = await this.userMissionsRepository.findOne({
      where: {
        user_id: claimMissionDto.userId,
        mission_id: claimMissionDto.missionId,
      },
    });

    if (!mission || !userMission || userMission.completed) {
      return { success: false, message: 'Misión no válida o ya completada' };
    }

    userMission.completed = true;
    userMission.completed_at = new Date();
    await this.userMissionsRepository.save(userMission);

    const user = await this.usersRepository.findOneBy({ id: claimMissionDto.userId });
    if (user && mission.reward_tokens) {
      user.tokens = (user.tokens || 0) + mission.reward_tokens;
      await this.usersRepository.save(user);
    }

    let streakInfo = null;
    if (mission.type === 'diaria') {
      const today = getTodayStr();
      let streak = await this.streaksRepository.findOne({ where: { user_id: claimMissionDto.userId } });
      if (!streak) {
        streak = this.streaksRepository.create({
          user_id: claimMissionDto.userId,
          current_streak: 1,
          max_streak: 1,
          last_activity: today,
        });
      } else if (streak.last_activity !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const y = yesterday.toISOString().slice(0, 10);
        streak.current_streak = streak.last_activity === y ? streak.current_streak + 1 : 1;
        streak.max_streak = Math.max(streak.max_streak, streak.current_streak);
        streak.last_activity = today;
      }
      await this.streaksRepository.save(streak);
      streakInfo = {
        currentStreak: streak.current_streak,
        maxStreak: streak.max_streak,
        newRecord: streak.current_streak === streak.max_streak,
      };
    }

    return {
      success: true,
      reward: { tokens: mission.reward_tokens || 0 },
      streak: streakInfo,
    };
  }

  async progress(progressMissionDto: ProgressMissionDto) {
    const missions = await this.missionsRepository.find({ where: { action: progressMissionDto.action } });
    const now = new Date();

    let completed = false;
    let reward = null;

    for (const mission of missions) {
      const userMission = await this.userMissionsRepository.findOne({
        where: {
          user_id: progressMissionDto.userId,
          mission_id: mission.id,
        },
      });

      if (!userMission || userMission.completed) continue;

      userMission.progress = Math.min(userMission.progress + 1, mission.goal);
      if (userMission.progress >= mission.goal) {
        userMission.completed = true;
        userMission.completed_at = now;
        completed = true;
        reward = { tokens: mission.reward_tokens || 0 };

        const user = await this.usersRepository.findOneBy({ id: progressMissionDto.userId });
        if (user && mission.reward_tokens) {
          user.tokens = (user.tokens || 0) + mission.reward_tokens;
          await this.usersRepository.save(user);
        }
      }

      await this.userMissionsRepository.save(userMission);
    }

    return { success: true, completed, reward };
  }
}
