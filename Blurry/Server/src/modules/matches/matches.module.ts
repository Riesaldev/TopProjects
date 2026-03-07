import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Match } from '../../database/entities/match.entity';
import { Contact } from '../../database/entities/contact.entity';
import { Setting } from '../../database/entities/setting.entity';
import { MatchingService } from './matching.service';
import { MatchesController } from './matches.controller';
import { AnonymousMatchingController } from './anonymous-matching.controller';
import { MatchingConfigController } from './matching-config.controller';
import { MatchesService } from './matches.service';
import { AnonymousMatchingService } from './anonymous-matching.service';
import { MatchingConfigService } from './matching-config.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User, Match, Contact, Setting]),
  ],
  controllers: [MatchesController, AnonymousMatchingController, MatchingConfigController],
  providers: [MatchesService, AnonymousMatchingService, MatchingConfigService, MatchingService],
  exports: [MatchesService, MatchingService],
})
export class MatchesModule {}