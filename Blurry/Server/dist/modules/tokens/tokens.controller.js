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
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./tokens.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const update_token_dto_1 = require("./dto/update-token.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TokensController = class TokensController {
    tokensService;
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    findAll() {
        return this.tokensService.findAll();
    }
    findOne(id) {
        return this.tokensService.findOne(id);
    }
    create(createTokenDto) {
        return this.tokensService.create(createTokenDto);
    }
    update(id, updateTokenDto) {
        return this.tokensService.update(id, updateTokenDto);
    }
    remove(id) {
        return this.tokensService.remove(id);
    }
    accumulate(body) {
        return this.tokensService.accumulate(body.user_id, body.amount, body.reason);
    }
    consume(body) {
        return this.tokensService.consume(body.user_id, body.amount, body.reason);
    }
    reward(body) {
        return this.tokensService.reward(body.user_id, body.amount, body.reason);
    }
    getBalance(user_id) {
        return this.tokensService.getBalance(user_id);
    }
};
exports.TokensController = TokensController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_token_dto_1.UpdateTokenDto]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('accumulate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "accumulate", null);
__decorate([
    (0, common_1.Post)('consume'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "consume", null);
__decorate([
    (0, common_1.Post)('reward'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "reward", null);
__decorate([
    (0, common_1.Get)('balance/:user_id'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TokensController.prototype, "getBalance", null);
exports.TokensController = TokensController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
//# sourceMappingURL=tokens.controller.js.map