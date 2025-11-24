"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInteractionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_interaction_entity_1 = require("../../database/entities/admin-interaction.entity");
const admin_interactions_service_1 = require("./admin-interactions.service");
const admin_interactions_controller_1 = require("./admin-interactions.controller");
let AdminInteractionsModule = class AdminInteractionsModule {
};
exports.AdminInteractionsModule = AdminInteractionsModule;
exports.AdminInteractionsModule = AdminInteractionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_interaction_entity_1.AdminInteraction])],
        controllers: [admin_interactions_controller_1.AdminInteractionsController],
        providers: [admin_interactions_service_1.AdminInteractionsService],
        exports: [admin_interactions_service_1.AdminInteractionsService],
    })
], AdminInteractionsModule);
//# sourceMappingURL=admin-interactions.module.js.map