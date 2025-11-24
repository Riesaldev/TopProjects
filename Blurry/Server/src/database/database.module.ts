import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}