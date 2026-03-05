import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sanction } from '../../database/entities/sanction.entity';
import { SanctionsController } from './sanctions.controller';
import { SanctionsService } from './sanctions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sanction])],
  controllers: [SanctionsController],
  providers: [SanctionsService],
  exports: [SanctionsService],
})
export class SanctionsModule {}
