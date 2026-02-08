import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminInteraction } from '../../database/entities/admin-interaction.entity';
import { CreateAdminInteractionDto } from './dto/create-admin-interaction.dto';
import { UpdateAdminInteractionDto } from './dto/update-admin-interaction.dto';

@Injectable()
export class AdminInteractionsService {
  constructor(
    @InjectRepository(AdminInteraction)
    private adminInteractionsRepository: Repository<AdminInteraction>,
  ) {}

  async findAll(): Promise<AdminInteraction[]> {
    return this.adminInteractionsRepository.find();
  }

  async findOne(id: number): Promise<AdminInteraction> {
    const interaction = await this.adminInteractionsRepository.findOneBy({ id });
    if (!interaction) throw new NotFoundException('Admin interaction not found');
    return interaction;
  }

  async create(createAdminInteractionDto: CreateAdminInteractionDto): Promise<AdminInteraction> {
    const interaction = this.adminInteractionsRepository.create(createAdminInteractionDto);
    return this.adminInteractionsRepository.save(interaction);
  }

  async update(id: number, updateAdminInteractionDto: UpdateAdminInteractionDto): Promise<AdminInteraction> {
    const interaction = await this.findOne(id);
    Object.assign(interaction, updateAdminInteractionDto);
    return this.adminInteractionsRepository.save(interaction);
  }

  async remove(id: number): Promise<void> {
    const interaction = await this.findOne(id);
    await this.adminInteractionsRepository.remove(interaction);
  }
} 