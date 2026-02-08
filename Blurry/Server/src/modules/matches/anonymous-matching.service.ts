import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Match } from '../../database/entities/match.entity';

export interface AnonymousProfile {
  id: string; // ID anónimo generado
  age: number;
  location: string;
  interests: string[];
  bio?: string;
  // Datos sensibles como nombre, foto, etc. NO se incluyen
}

export interface MatchDecision {
  profileId: string;
  decision: 'like' | 'pass';
  userId: number;
}

@Injectable()
export class AnonymousMatchingService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  async getAnonymousProfiles(userId: number, limit: number = 10): Promise<AnonymousProfile[]> {
    // Obtener usuario actual
    const currentUser = await this.usersRepository.findOneBy({ id: userId });
    if (!currentUser) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener usuarios ya evaluados (matches existentes)
    const existingMatches = await this.matchesRepository.find({
      where: [
        { user_a_id: userId },
        { user_b_id: userId }
      ]
    });

    const evaluatedUserIds = new Set([
      ...existingMatches.map(m => m.user_a_id),
      ...existingMatches.map(m => m.user_b_id)
    ]);
    evaluatedUserIds.add(userId); // Excluir al usuario actual

    // Obtener candidatos potenciales
    const candidates = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id NOT IN (:...excludeIds)', { excludeIds: Array.from(evaluatedUserIds) })
      .andWhere('user.is_suspended = false')
      .limit(limit * 2) // Obtener más para filtrar mejor
      .getMany();

    // Convertir a perfiles anónimos
    const anonymousProfiles = candidates
      .slice(0, limit)
      .map(user => this.userToAnonymousProfile(user));

    return anonymousProfiles;
  }

  async submitMatchDecision(decision: MatchDecision): Promise<{ isMatch: boolean; matchId?: number }> {
    const { profileId, decision: userDecision, userId } = decision;
    
    // Decodificar el ID real del perfil anónimo
    const targetUserId = this.decodeAnonymousId(profileId);
    
    // Crear o actualizar el match
    let match = await this.matchesRepository.findOne({
      where: [
        { user_a_id: userId, user_b_id: targetUserId },
        { user_a_id: targetUserId, user_b_id: userId }
      ]
    });

    if (!match) {
      // Crear nuevo match
      match = this.matchesRepository.create({
        user_a_id: userId,
        user_b_id: targetUserId,
        status: userDecision === 'like' ? 'pending' : 'rejected'
      });
    } else if (userDecision === 'like' && match.status === 'pending') {
      // Actualizar match existente para match mutuo
      match.status = 'mutual';
    } else if (userDecision === 'pass') {
      // Rechazar match
      match.status = 'rejected';
    }

    const savedMatch = await this.matchesRepository.save(match);
    
    return {
      isMatch: savedMatch.status === 'mutual',
      matchId: savedMatch.status === 'mutual' ? savedMatch.id : undefined
    };
  }

  private userToAnonymousProfile(user: User): AnonymousProfile {
    return {
      id: this.generateAnonymousId(user.id),
      age: user.age,
      location: this.anonymizeLocation(user.location),
      interests: this.extractInterests(user.values_profile),
      bio: this.anonymizeBio(user.values_profile?.bio)
    };
  }

  private generateAnonymousId(userId: number): string {
    // Generar ID anónimo basado en el ID real pero no reversible fácilmente
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    const userPart = (userId * 7919).toString(36); // Multiplicar por primo para ofuscar
    return `${timestamp}_${userPart}_${randomPart}`;
  }

  private decodeAnonymousId(anonymousId: string): number {
    // Extraer la parte del usuario del ID anónimo
    const parts = anonymousId.split('_');
    if (parts.length !== 3) {
      throw new Error('ID anónimo inválido');
    }
    
    const userPart = parseInt(parts[1], 36);
    return Math.round(userPart / 7919); // Dividir por el primo usado para ofuscar
  }

  private anonymizeLocation(location: string): string {
    // Solo mostrar los primeros 2-3 caracteres del código postal o ciudad
    if (location.length <= 2) return location;
    return location.substring(0, 2) + '***';
  }

  private extractInterests(profile: any): string[] {
    if (!profile?.interests) return [];
    
    // Limitar a 5 intereses máximo para mantener anonimato
    const interests = Array.isArray(profile.interests) ? profile.interests : [];
    return interests.slice(0, 5);
  }

  private anonymizeBio(bio: string): string | undefined {
    if (!bio || bio.length === 0) return undefined;
    
    // Truncar bio y eliminar información personal potencial
    let anonymizedBio = bio
      .substring(0, 150) // Máximo 150 caracteres
      .replace(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, '[Nombre]') // Nombres propios
      .replace(/\b\d{2,}\b/g, '[Número]') // Números largos
      .replace(/@\w+/g, '[Usuario]'); // Menciones
    
    return anonymizedBio + (bio.length > 150 ? '...' : '');
  }
}
