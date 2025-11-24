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
exports.AdminInteractionsController = void 0;
const common_1 = require("@nestjs/common");
const admin_interactions_service_1 = require("./admin-interactions.service");
const create_admin_interaction_dto_1 = require("./dto/create-admin-interaction.dto");
const update_admin_interaction_dto_1 = require("./dto/update-admin-interaction.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AdminInteractionsController = class AdminInteractionsController {
    adminInteractionsService;
    constructor(adminInteractionsService) {
        this.adminInteractionsService = adminInteractionsService;
    }
    findAll() {
        return this.adminInteractionsService.findAll();
    }
    findOne(id) {
        return this.adminInteractionsService.findOne(id);
    }
    create(createAdminInteractionDto) {
        return this.adminInteractionsService.create(createAdminInteractionDto);
    }
    update(id, updateAdminInteractionDto) {
        return this.adminInteractionsService.update(id, updateAdminInteractionDto);
    }
    remove(id) {
        return this.adminInteractionsService.remove(id);
    }
};
exports.AdminInteractionsController = AdminInteractionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminInteractionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminInteractionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_interaction_dto_1.CreateAdminInteractionDto]),
    __metadata("design:returntype", void 0)
], AdminInteractionsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_admin_interaction_dto_1.UpdateAdminInteractionDto]),
    __metadata("design:returntype", void 0)
], AdminInteractionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminInteractionsController.prototype, "remove", null);
exports.AdminInteractionsController = AdminInteractionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin-interactions'),
    __metadata("design:paramtypes", [admin_interactions_service_1.AdminInteractionsService])
], AdminInteractionsController);
//# sourceMappingURL=admin-interactions.controller.js.map