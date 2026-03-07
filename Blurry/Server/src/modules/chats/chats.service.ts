import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../../database/entities/chat-message.entity';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatsRepository: Repository<ChatMessage>,
  ) {}

  async findAll(userId?: number, contactId?: number): Promise<ChatMessage[]> {
    const all = await this.chatsRepository.find({ order: { timestamp: 'ASC' } });

    if (typeof userId === 'number' && typeof contactId === 'number') {
      return all.filter(
        (m) =>
          (m.user_id === userId && m.contact_id === contactId) ||
          (m.user_id === contactId && m.contact_id === userId),
      );
    }

    if (typeof userId === 'number') {
      return all.filter((m) => m.user_id === userId || m.contact_id === userId);
    }

    return all;
  }

  async search(keyword: string): Promise<any[]> {
    return this.chatsRepository.createQueryBuilder('chat')
      .leftJoinAndSelect('users', 'user', 'user.id = chat.sender_id')
      .select(['chat.*', 'user.display_name as sender_name'])
      .where('LOWER(chat.content) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
      .orderBy('chat.timestamp', 'DESC')
      .getRawMany();
  }

  async findOne(id: number): Promise<ChatMessage> {
    const msg = await this.chatsRepository.findOneBy({ id });
    if (!msg) throw new NotFoundException('Chat message not found');
    return msg;
  }

  async create(createChatMessageDto: CreateChatMessageDto): Promise<ChatMessage> {
    const msg = this.chatsRepository.create(createChatMessageDto);
    return this.chatsRepository.save(msg);
  }

  async update(id: number, updateChatMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
    const msg = await this.findOne(id);
    Object.assign(msg, updateChatMessageDto);
    return this.chatsRepository.save(msg);
  }

  async remove(id: number): Promise<void> {
    const msg = await this.findOne(id);
    await this.chatsRepository.remove(msg);
  }
}
