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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("../../database/entities/token.entity");
let TokensService = class TokensService {
    tokensRepository;
    constructor(tokensRepository) {
        this.tokensRepository = tokensRepository;
    }
    async findAll() {
        return this.tokensRepository.find();
    }
    async findOne(id) {
        const token = await this.tokensRepository.findOneBy({ id });
        if (!token)
            throw new common_1.NotFoundException('Token not found');
        return token;
    }
    async create(createTokenDto) {
        const token = this.tokensRepository.create(createTokenDto);
        return this.tokensRepository.save(token);
    }
    async update(id, updateTokenDto) {
        const token = await this.findOne(id);
        Object.assign(token, updateTokenDto);
        return this.tokensRepository.save(token);
    }
    async remove(id) {
        const token = await this.findOne(id);
        await this.tokensRepository.remove(token);
    }
    async accumulate(user_id, amount, reason) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const token = this.tokensRepository.create({ user_id, amount, reason });
        return this.tokensRepository.save(token);
    }
    async consume(user_id, amount, reason) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const token = this.tokensRepository.create({ user_id, amount: -amount, reason });
        return this.tokensRepository.save(token);
    }
    async reward(user_id, amount, reason) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const token = this.tokensRepository.create({ user_id, amount, reason });
        return this.tokensRepository.save(token);
    }
    async getBalance(user_id) {
        const tokens = await this.tokensRepository.find({ where: { user_id } });
        return tokens.reduce((acc, t) => acc + t.amount, 0);
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TokensService);
//# sourceMappingURL=tokens.service.js.map