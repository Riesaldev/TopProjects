import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceStatus } from '../../database/entities/service-status.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceStatus)
    private servicesRepository: Repository<ServiceStatus>,
  ) {}

  async findAll(): Promise<ServiceStatus[]> {
    return this.servicesRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<ServiceStatus> {
    const service = await this.servicesRepository.findOneBy({ id });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<ServiceStatus> {
    const service = this.servicesRepository.create({
      ...createServiceDto,
      estado: createServiceDto.estado || 'Activo',
    });
    return this.servicesRepository.save(service);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<ServiceStatus> {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return this.servicesRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.servicesRepository.remove(service);
  }
}
