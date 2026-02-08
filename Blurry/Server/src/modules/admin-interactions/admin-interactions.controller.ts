import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminInteractionsService } from './admin-interactions.service';
import { CreateAdminInteractionDto } from './dto/create-admin-interaction.dto';
import { UpdateAdminInteractionDto } from './dto/update-admin-interaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin-interactions')
export class AdminInteractionsController {
  constructor(private readonly adminInteractionsService: AdminInteractionsService) {}

  @Get()
  findAll() {
    return this.adminInteractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminInteractionsService.findOne(id);
  }

  @Post()
  create(@Body() createAdminInteractionDto: CreateAdminInteractionDto) {
    return this.adminInteractionsService.create(createAdminInteractionDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminInteractionDto: UpdateAdminInteractionDto) {
    return this.adminInteractionsService.update(id, updateAdminInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminInteractionsService.remove(id);
  }
} 