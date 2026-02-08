import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tokensService.findOne(id);
  }

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokensService.update(id, updateTokenDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tokensService.remove(id);
  }

  // Endpoint para acumular tokens
  @Post('accumulate')
  accumulate(@Body() body: { user_id: number; amount: number; reason: string }) {
    return this.tokensService.accumulate(body.user_id, body.amount, body.reason);
  }

  // Endpoint para consumir tokens
  @Post('consume')
  consume(@Body() body: { user_id: number; amount: number; reason: string }) {
    return this.tokensService.consume(body.user_id, body.amount, body.reason);
  }

  // Endpoint para recompensar tokens
  @Post('reward')
  reward(@Body() body: { user_id: number; amount: number; reason: string }) {
    return this.tokensService.reward(body.user_id, body.amount, body.reason);
  }

  // Endpoint para consultar saldo de tokens
  @Get('balance/:user_id')
  getBalance(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.tokensService.getBalance(user_id);
  }
} 