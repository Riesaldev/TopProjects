import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      // Verificar si el usuario está suspendido
      if (user.is_suspended) {
        const suspensionMessage = user.suspension_until 
          ? `Cuenta suspendida hasta ${user.suspension_until.toLocaleDateString()}`
          : 'Cuenta suspendida indefinidamente';
        throw new UnauthorizedException(`${suspensionMessage}. Razón: ${user.suspension_reason}`);
      }
      
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async register(userDto: any) {
    try {
      // Verificar si el email ya existe
      const existingEmail = await this.usersService.findByEmail(userDto.email);
      if (existingEmail) {
        throw new ConflictException('El email ya está registrado');
      }

      // Verificar si el display_name ya existe
      const existingDisplayName = await this.usersService.findByDisplayName(userDto.display_name);
      if (existingDisplayName) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      
      // Crear el nuevo usuario
      const newUser = await this.usersService.create({
        email: userDto.email,
        password_hash: hashedPassword,
        role: 'user',
        display_name: userDto.display_name,
        age: userDto.age,
        gender: userDto.gender,
        location: userDto.location,
        values_profile: userDto.values_profile || {}
      });

      // Eliminar password_hash antes de devolver
      const { password_hash, ...userWithoutPassword } = newUser;
      
      // Generar token y devolver respuesta
      return this.login(userWithoutPassword);
    } catch (error) {
      // Re-lanzar errores específicos para que sean manejados por el controlador
      throw error;
    }
  }
}