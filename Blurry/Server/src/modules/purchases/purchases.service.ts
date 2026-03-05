import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../database/entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async findAll(userId?: number): Promise<Purchase[]> {
    if (typeof userId === 'number' && !Number.isNaN(userId)) {
      return this.purchasesRepository.find({ where: { user_id: userId }, order: { created_at: 'DESC' } });
    }

    return this.purchasesRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findOneBy({ id });
    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }
    return purchase;
  }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const quantity = createPurchaseDto.quantity ?? 1;
    const total = createPurchaseDto.total ?? createPurchaseDto.price * quantity;

    const purchase = this.purchasesRepository.create({
      ...createPurchaseDto,
      quantity,
      total,
      status: createPurchaseDto.status || 'completed',
    });

    return this.purchasesRepository.save(purchase);
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    const purchase = await this.findOne(id);
    Object.assign(purchase, updatePurchaseDto);

    if (
      typeof updatePurchaseDto.price === 'number' ||
      typeof updatePurchaseDto.quantity === 'number'
    ) {
      purchase.total = Number(purchase.price) * Number(purchase.quantity || 1);
    }

    return this.purchasesRepository.save(purchase);
  }

  async remove(id: number): Promise<void> {
    const purchase = await this.findOne(id);
    await this.purchasesRepository.remove(purchase);
  }
}
