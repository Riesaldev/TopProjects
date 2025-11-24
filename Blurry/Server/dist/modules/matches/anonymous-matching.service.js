"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousMatchingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const match_entity_1 = require("../../database/entities/match.entity");
let AnonymousMatchingService = class AnonymousMatchingService {
    usersRepository;
    matchesRepository;
    constructor(usersRepository, matchesRepository) {
        this.usersRepository = usersRepository;
        this.matchesRepository = matchesRepository;
    }
    async getAnonymousProfiles(userId, limit = 10) {
        const currentUser = await this.usersRepository.findOneBy({ id: userId });
        if (!currentUser) {
            throw new Error('Usuario no encontrado');
        }
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
        evaluatedUserIds.add(userId);
        const candidates = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id NOT IN (:...excludeIds)', { excludeIds: Array.from(evaluatedUserIds) })
            .andWhere('user.is_suspended = false')
            .limit(limit * 2)
            .getMany();
        const anonymousProfiles = candidates
            .slice(0, limit)
            .map(user => this.userToAnonymousProfile(user));
        return anonymousProfiles;
    }
    async submitMatchDecision(decision) {
        const { profileId, decision: userDecision, userId } = decision;
        const targetUserId = this.decodeAnonymousId(profileId);
        let match = await this.matchesRepository.findOne({
            where: [
                { user_a_id: userId, user_b_id: targetUserId },
                { user_a_id: targetUserId, user_b_id: userId }
            ]
        });
        if (!match) {
            match = this.matchesRepository.create({
                user_a_id: userId,
                user_b_id: targetUserId,
                status: userDecision === 'like' ? 'pending' : 'rejected'
            });
        }
        else if (userDecision === 'like' && match.status === 'pending') {
            match.status = 'mutual';
        }
        else if (userDecision === 'pass') {
            match.status = 'rejected';
        }
        const savedMatch = await this.matchesRepository.save(match);
        return {
            isMatch: savedMatch.status === 'mutual',
            matchId: savedMatch.status === 'mutual' ? savedMatch.id : undefined
        };
    }
    userToAnonymousProfile(user) {
        return {
            id: this.generateAnonymousId(user.id),
            age: user.age,
            location: this.anonymizeLocation(user.location),
            interests: this.extractInterests(user.values_profile),
            bio: this.anonymizeBio(user.values_profile?.bio)
        };
    }
    generateAnonymousId(userId) {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substring(2, 8);
        const userPart = (userId * 7919).toString(36);
        return `${timestamp}_${userPart}_${randomPart}`;
    }
    decodeAnonymousId(anonymousId) {
        const parts = anonymousId.split('_');
        if (parts.length !== 3) {
            throw new Error('ID anónimo inválido');
        }
        const userPart = parseInt(parts[1], 36);
        return Math.round(userPart / 7919);
    }
    anonymizeLocation(location) {
        if (location.length <= 2)
            return location;
        return location.substring(0, 2) + '***';
    }
    extractInterests(profile) {
        if (!profile?.interests)
            return [];
        const interests = Array.isArray(profile.interests) ? profile.interests : [];
        return interests.slice(0, 5);
    }
    anonymizeBio(bio) {
        if (!bio || bio.length === 0)
            return undefined;
        let anonymizedBio = bio
            .substring(0, 150)
            .replace(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, '[Nombre]')
            .replace(/\b\d{2,}\b/g, '[Número]')
            .replace(/@\w+/g, '[Usuario]');
        return anonymizedBio + (bio.length > 150 ? '...' : '');
    }
};
exports.AnonymousMatchingService = AnonymousMatchingService;
exports.AnonymousMatchingService = AnonymousMatchingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnonymousMatchingService);
//# sourceMappingURL=anonymous-matching.service.js.map