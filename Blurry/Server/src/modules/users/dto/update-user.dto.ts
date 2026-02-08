import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean()
  is_suspended?: boolean;

  @IsOptional()
  @IsString()
  suspension_reason?: string;

  @IsOptional()
  suspension_until?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  interests?: string;

  @IsOptional()
  @IsString()
  imagen_perfil?: string;

  @IsOptional()
  @IsNumber()
  tokens?: number;
}