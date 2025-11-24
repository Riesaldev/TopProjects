"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsGeneratedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_generated_entity_1 = require("../../database/entities/report-generated.entity");
const reports_generated_service_1 = require("./reports-generated.service");
const reports_generated_controller_1 = require("./reports-generated.controller");
let ReportsGeneratedModule = class ReportsGeneratedModule {
};
exports.ReportsGeneratedModule = ReportsGeneratedModule;
exports.ReportsGeneratedModule = ReportsGeneratedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([report_generated_entity_1.ReportGenerated])],
        controllers: [reports_generated_controller_1.ReportsGeneratedController],
        providers: [reports_generated_service_1.ReportsGeneratedService],
        exports: [reports_generated_service_1.ReportsGeneratedService],
    })
], ReportsGeneratedModule);
//# sourceMappingURL=reports-generated.module.js.map