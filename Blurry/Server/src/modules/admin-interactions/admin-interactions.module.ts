import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminInteraction } from '../../database/entities/admin-interaction.entity';
import { AdminInteractionsService } from './admin-interactions.service';
import { AdminInteractionsController } from './admin-interactions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminInteraction])],
  controllers: [AdminInteractionsController],
  providers: [AdminInteractionsService],
  exports: [AdminInteractionsService],
})
export class AdminInteractionsModule {} 