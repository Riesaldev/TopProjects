import { IsString, IsInt, IsNotEmpty, IsEmail, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password_hash!: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsNotEmpty()
  display_name!: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  values_profile?: any;

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
  @IsInt()
  tokens?: number;
}

