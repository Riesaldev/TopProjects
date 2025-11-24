import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsInt, IsIn } from 'class-validator';

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  display_name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        throw new BadRequestException('Email o contraseña incorrectos');
      }
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error en el inicio de sesión');
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        error && typeof error === 'object' && 'message' in error
          ? error.message
          : 'Error en el registro'
      );
    }
  }
}