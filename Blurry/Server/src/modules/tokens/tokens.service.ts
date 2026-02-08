import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../database/entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  async findAll(): Promise<Token[]> {
    return this.tokensRepository.find();
  }

  async findOne(id: number): Promise<Token> {
    const token = await this.tokensRepository.findOneBy({ id });
    if (!token) throw new NotFoundException('Token not found');
    return token;
  }

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const token = this.tokensRepository.create(createTokenDto);
    return this.tokensRepository.save(token);
  }

  async update(id: number, updateTokenDto: UpdateTokenDto): Promise<Token> {
    const token = await this.findOne(id);
    Object.assign(token, updateTokenDto);
    return this.tokensRepository.save(token);
  }

  async remove(id: number): Promise<void> {
    const token = await this.findOne(id);
    await this.tokensRepository.remove(token);
  }

  // Lógica de acumulación de tokens
  async accumulate(user_id: number, amount: number, reason: string): Promise<Token> {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    const token = this.tokensRepository.create({ user_id, amount, reason });
    return this.tokensRepository.save(token);
  }

  // Lógica de consumo de tokens
  async consume(user_id: number, amount: number, reason: string): Promise<Token> {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    // Se registra el consumo como un token negativo
    const token = this.tokensRepository.create({ user_id, amount: -amount, reason });
    return this.tokensRepository.save(token);
  }

  // Lógica de recompensa de tokens
  async reward(user_id: number, amount: number, reason: string): Promise<Token> {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    const token = this.tokensRepository.create({ user_id, amount, reason });
    return this.tokensRepository.save(token);
  }

  // Consultar saldo de tokens de un usuario
  async getBalance(user_id: number): Promise<number> {
    const tokens = await this.tokensRepository.find({ where: { user_id } });
    return tokens.reduce((acc, t) => acc + t.amount, 0);
  }
} 