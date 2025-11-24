import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { Setting } from '../../database/entities/setting.entity';
import { MatchingTestRequest, MatchingTestResult } from './matching-config.controller';

@Injectable()
export class MatchingConfigService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Setting)
    private readonly settingsRepository: Repository<Setting>,
  ) {}

  async testConfiguration(request: MatchingTestRequest): Promise<MatchingTestResult> {
    const { ageWeight, distanceWeight, interestsWeight, testUserId } = request;
    
    // Obtener el usuario de prueba
    const testUser = await this.usersRepository.findOneBy({ id: testUserId });
    if (!testUser) {
      throw new Error('Usuario de prueba no encontrado');
    }

    // Obtener todos los demás usuarios activos
    const allUsers = await this.usersRepository.find({
      where: { is_suspended: false }
    });
    
    const otherUsers = allUsers.filter(u => u.id !== testUserId);
    
    // Calcular scores para cada usuario
    const matches = otherUsers.map(user => {
      const ageScore = this.calculateAgeCompatibility(testUser.age, user.age);
      const distanceScore = this.calculateDistanceCompatibility(testUser.location, user.location);
      const interestsScore = this.calculateInterestsCompatibility(testUser.values_profile, user.values_profile);
      
      // Calcular score ponderado
      const score = (
        (ageScore * ageWeight / 100) +
        (distanceScore * distanceWeight / 100) +
        (interestsScore * interestsWeight / 100)
      );
      
      return {
        userId: user.id,
        score: Math.round(score * 100) / 100,
        breakdown: {
          ageScore: Math.round(ageScore * 100) / 100,
          distanceScore: Math.round(distanceScore * 100) / 100,
          interestsScore: Math.round(interestsScore * 100) / 100,
        }
      };
    }).sort((a, b) => b.score - a.score); // Ordenar por score descendente

    // Filtrar matches con score > 0.3 (threshold mínimo)
    const goodMatches = matches.filter(m => m.score > 0.3);
    
    const averageScore = goodMatches.length > 0 
      ? goodMatches.reduce((sum, m) => sum + m.score, 0) / goodMatches.length 
      : 0;

    return {
      matches: goodMatches.slice(0, 10), // Top 10 matches
      totalMatches: goodMatches.length,
      averageScore: Math.round(averageScore * 100) / 100
    };
  }

  async applyConfiguration(config: { ageWeight: number; distanceWeight: number; interestsWeight: number }) {
    // Guardar configuración en la base de datos
    await this.saveOrUpdateSetting('matching_age_weight', config.ageWeight.toString());
    await this.saveOrUpdateSetting('matching_distance_weight', config.distanceWeight.toString());
    await this.saveOrUpdateSetting('matching_interests_weight', config.interestsWeight.toString());
    
    return { success: true, message: 'Configuración aplicada correctamente' };
  }

  private async saveOrUpdateSetting(key: string, value: string) {
    const existing = await this.settingsRepository.findOneBy({ key });
    if (existing) {
      existing.value = value;
      existing.updated_at = new Date();
      await this.settingsRepository.save(existing);
    } else {
      const newSetting = this.settingsRepository.create({
        key,
        value,
        updated_by: 'admin',
        updated_at: new Date(),
      });
      await this.settingsRepository.save(newSetting);
    }
  }

  private calculateAgeCompatibility(age1: number, age2: number): number {
    const ageDiff = Math.abs(age1 - age2);
    // Score alto si la diferencia es menor
    if (ageDiff <= 2) return 1.0;
    if (ageDiff <= 5) return 0.8;
    if (ageDiff <= 10) return 0.6;
    if (ageDiff <= 15) return 0.4;
    return 0.2;
  }

  private calculateDistanceCompatibility(location1: string, location2: string): number {
    // Simplificado: comparar códigos postales o ubicaciones
    if (location1 === location2) return 1.0;
    
    // Si tienen prefijos similares (ej: mismo código postal parcial)
    if (location1.substring(0, 2) === location2.substring(0, 2)) return 0.7;
    
    // Ubicaciones diferentes
    return 0.3;
  }

  private calculateInterestsCompatibility(profile1: any, profile2: any): number {
    if (!profile1 || !profile2) return 0.5;
    
    // Simplificado: comparar intereses si están disponibles
    const interests1 = profile1.interests || [];
    const interests2 = profile2.interests || [];
    
    if (interests1.length === 0 && interests2.length === 0) return 0.5;
    
    // Calcular intersección de intereses
    const commonInterests = interests1.filter((interest: string) => 
      interests2.includes(interest)
    );
    
    if (interests1.length === 0 || interests2.length === 0) return 0.3;
    
    const compatibility = commonInterests.length / Math.max(interests1.length, interests2.length);
    return Math.min(compatibility * 2, 1.0); // Amplificar un poco la compatibilidad
  }
}
