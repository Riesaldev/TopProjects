import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'display_name', 'age', 'gender', 'location', 'role', 'is_suspended', 'created_at'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'display_name', 'age', 'gender', 'location', 'role', 'is_suspended', 'values_profile', 'created_at'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByDisplayName(display_name: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { display_name } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Verificar si el display_name ya existe
    const existingDisplayName = await this.findByDisplayName(createUserDto.display_name);
    if (existingDisplayName) {
      throw new ConflictException('Display name already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Verificar email único si se está actualizando
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    // Verificar display_name único si se está actualizando
    if (updateUserDto.display_name && updateUserDto.display_name !== user.display_name) {
      const existingDisplayName = await this.findByDisplayName(updateUserDto.display_name);
      if (existingDisplayName) {
        throw new ConflictException('Display name already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async suspend(id: number, reason?: string, days?: number): Promise<User> {
    const user = await this.findOne(id);

    user.is_suspended = true;
    user.suspension_reason = reason || 'No reason provided';

    if (days) {
      const suspensionUntil = new Date();
      suspensionUntil.setDate(suspensionUntil.getDate() + days);
      user.suspension_until = suspensionUntil;
    }

    return this.usersRepository.save(user);
  }

  async unsuspend(id: number): Promise<User> {
    const user = await this.findOne(id);

    user.is_suspended = false;
    user.suspension_reason = null;
    user.suspension_until = null;

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}