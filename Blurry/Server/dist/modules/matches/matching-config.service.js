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
exports.MatchingConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const setting_entity_1 = require("../../database/entities/setting.entity");
let MatchingConfigService = class MatchingConfigService {
    usersRepository;
    settingsRepository;
    constructor(usersRepository, settingsRepository) {
        this.usersRepository = usersRepository;
        this.settingsRepository = settingsRepository;
    }
    async testConfiguration(request) {
        const { ageWeight, distanceWeight, interestsWeight, testUserId } = request;
        const testUser = await this.usersRepository.findOneBy({ id: testUserId });
        if (!testUser) {
            throw new Error('Usuario de prueba no encontrado');
        }
        const allUsers = await this.usersRepository.find({
            where: { is_suspended: false }
        });
        const otherUsers = allUsers.filter(u => u.id !== testUserId);
        const matches = otherUsers.map(user => {
            const ageScore = this.calculateAgeCompatibility(testUser.age, user.age);
            const distanceScore = this.calculateDistanceCompatibility(testUser.location, user.location);
            const interestsScore = this.calculateInterestsCompatibility(testUser.values_profile, user.values_profile);
            const score = ((ageScore * ageWeight / 100) +
                (distanceScore * distanceWeight / 100) +
                (interestsScore * interestsWeight / 100));
            return {
                userId: user.id,
                score: Math.round(score * 100) / 100,
                breakdown: {
                    ageScore: Math.round(ageScore * 100) / 100,
                    distanceScore: Math.round(distanceScore * 100) / 100,
                    interestsScore: Math.round(interestsScore * 100) / 100,
                }
            };
        }).sort((a, b) => b.score - a.score);
        const goodMatches = matches.filter(m => m.score > 0.3);
        const averageScore = goodMatches.length > 0
            ? goodMatches.reduce((sum, m) => sum + m.score, 0) / goodMatches.length
            : 0;
        return {
            matches: goodMatches.slice(0, 10),
            totalMatches: goodMatches.length,
            averageScore: Math.round(averageScore * 100) / 100
        };
    }
    async applyConfiguration(config) {
        await this.saveOrUpdateSetting('matching_age_weight', config.ageWeight.toString());
        await this.saveOrUpdateSetting('matching_distance_weight', config.distanceWeight.toString());
        await this.saveOrUpdateSetting('matching_interests_weight', config.interestsWeight.toString());
        return { success: true, message: 'Configuración aplicada correctamente' };
    }
    async saveOrUpdateSetting(key, value) {
        const existing = await this.settingsRepository.findOneBy({ key });
        if (existing) {
            existing.value = value;
            existing.updated_at = new Date();
            await this.settingsRepository.save(existing);
        }
        else {
            const newSetting = this.settingsRepository.create({
                key,
                value,
                updated_by: 'admin',
                updated_at: new Date(),
            });
            await this.settingsRepository.save(newSetting);
        }
    }
    calculateAgeCompatibility(age1, age2) {
        const ageDiff = Math.abs(age1 - age2);
        if (ageDiff <= 2)
            return 1.0;
        if (ageDiff <= 5)
            return 0.8;
        if (ageDiff <= 10)
            return 0.6;
        if (ageDiff <= 15)
            return 0.4;
        return 0.2;
    }
    calculateDistanceCompatibility(location1, location2) {
        if (location1 === location2)
            return 1.0;
        if (location1.substring(0, 2) === location2.substring(0, 2))
            return 0.7;
        return 0.3;
    }
    calculateInterestsCompatibility(profile1, profile2) {
        if (!profile1 || !profile2)
            return 0.5;
        const interests1 = profile1.interests || [];
        const interests2 = profile2.interests || [];
        if (interests1.length === 0 && interests2.length === 0)
            return 0.5;
        const commonInterests = interests1.filter((interest) => interests2.includes(interest));
        if (interests1.length === 0 || interests2.length === 0)
            return 0.3;
        const compatibility = commonInterests.length / Math.max(interests1.length, interests2.length);
        return Math.min(compatibility * 2, 1.0);
    }
};
exports.MatchingConfigService = MatchingConfigService;
exports.MatchingConfigService = MatchingConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MatchingConfigService);
//# sourceMappingURL=matching-config.service.js.map