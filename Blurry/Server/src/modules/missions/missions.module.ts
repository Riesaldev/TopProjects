import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from '../../database/entities/mission.entity';
import { UserMission } from '../../database/entities/user-mission.entity';
import { User } from '../../database/entities/user.entity';
import { Streak } from '../../database/entities/streak.entity';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, UserMission, User, Streak])],
  controllers: [MissionsController],
  providers: [MissionsService],
  exports: [MissionsService],
})
export class MissionsModule {}
