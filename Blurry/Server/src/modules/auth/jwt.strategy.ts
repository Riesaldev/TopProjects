import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // Verificar si el usuario está suspendido
    if (user.is_suspended) {
      const suspensionMessage = user.suspension_until 
        ? `Account suspended until ${user.suspension_until.toLocaleDateString()}`
        : 'Account suspended indefinitely';
      throw new UnauthorizedException(`${suspensionMessage}. Reason: ${user.suspension_reason}`);
    }
    
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}