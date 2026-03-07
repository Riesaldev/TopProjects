import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class MatchingService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getRecommendations(userId: number): Promise<any[]> {
    const currentUser = await this.usersRepository.findOneBy({ id: userId });
    if (!currentUser) throw new Error('User not found');

    // Fetch potential candidates
    const allUsers = await this.usersRepository.find();
    
    const candidates = allUsers.filter(u => u.id !== userId && u.role !== 'admin');

    const scoredCandidates = candidates.map(candidate => {
      let score = 0;
      
      // Basic rules
      if (candidate.gender && currentUser.values_profile?.matching?.matchGoal === candidate.gender) {
        score += 30; // Match on desired gender
      }

      // Proximity score (simulated based on Location)
      if (candidate.location && currentUser.location && candidate.location === currentUser.location) {
        score += 20;
      }

      // Age difference
      if (candidate.age && currentUser.age) {
        const diff = Math.abs(candidate.age - currentUser.age);
        if (diff <= 5) score += 20;
        else if (diff <= 10) score += 10;
      }

      // Interests overlap
      if (currentUser.interests && candidate.interests) {
        const myInterests = currentUser.interests.split(',').map(i => i.trim().toLowerCase());
        const theirInterests = candidate.interests.split(',').map(i => i.trim().toLowerCase());
        const overlap = myInterests.filter(i => theirInterests.includes(i)).length;
        score += Math.min(overlap * 10, 30); // max 30 points from interests
      }

      return {
        ...candidate,
        compatibilityScore: score,
        photos: candidate.photos || (candidate.imagen_perfil ? [candidate.imagen_perfil] : []),
      };
    });

    // Sort by descending score
    return scoredCandidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }
}
