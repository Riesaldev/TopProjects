import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  findAll(@Query('userId') userId?: string, @Query('contactId') contactId?: string) {
    const parsedUserId = userId ? Number(userId) : undefined;
    const parsedContactId = contactId ? Number(contactId) : undefined;
    return this.chatsService.findAll(parsedUserId, parsedContactId);
  }

  @Get('search/all')
  searchAll(@Query('q') query: string) {
    if (!query) return [];
    return this.chatsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.findOne(id);
  }

  @Post()
  create(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatsService.create(createChatMessageDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatsService.update(id, updateChatMessageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.remove(id);
  }
}
