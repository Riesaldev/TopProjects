import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sanction } from '../../database/entities/sanction.entity';
import { CreateSanctionDto } from './dto/create-sanction.dto';
import { UpdateSanctionDto } from './dto/update-sanction.dto';

@Injectable()
export class SanctionsService {
  constructor(
    @InjectRepository(Sanction)
    private sanctionsRepository: Repository<Sanction>,
  ) {}

  async findAll(): Promise<Sanction[]> {
    return this.sanctionsRepository.find({ order: { fecha: 'DESC' } });
  }

  async findOne(id: number): Promise<Sanction> {
    const sanction = await this.sanctionsRepository.findOneBy({ id });
    if (!sanction) throw new NotFoundException('Sanction not found');
    return sanction;
  }

  async create(createSanctionDto: CreateSanctionDto): Promise<Sanction> {
    const sanction = this.sanctionsRepository.create({
      ...createSanctionDto,
      estado: createSanctionDto.estado || 'Activa',
    });
    return this.sanctionsRepository.save(sanction);
  }

  async update(id: number, updateSanctionDto: UpdateSanctionDto): Promise<Sanction> {
    const sanction = await this.findOne(id);
    Object.assign(sanction, updateSanctionDto);
    return this.sanctionsRepository.save(sanction);
  }

  async remove(id: number): Promise<void> {
    const sanction = await this.findOne(id);
    await this.sanctionsRepository.remove(sanction);
  }
}
