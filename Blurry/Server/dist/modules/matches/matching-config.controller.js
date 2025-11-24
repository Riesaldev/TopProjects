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
exports.MatchingConfigController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const matching_config_service_1 = require("./matching-config.service");
let MatchingConfigController = class MatchingConfigController {
    matchingConfigService;
    constructor(matchingConfigService) {
        this.matchingConfigService = matchingConfigService;
    }
    async testConfiguration(request) {
        return this.matchingConfigService.testConfiguration(request);
    }
    async applyConfiguration(config) {
        return this.matchingConfigService.applyConfiguration(config);
    }
};
exports.MatchingConfigController = MatchingConfigController;
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchingConfigController.prototype, "testConfiguration", null);
__decorate([
    (0, common_1.Post)('apply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchingConfigController.prototype, "applyConfiguration", null);
exports.MatchingConfigController = MatchingConfigController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/matching'),
    __metadata("design:paramtypes", [matching_config_service_1.MatchingConfigService])
], MatchingConfigController);
//# sourceMappingURL=matching-config.controller.js.map