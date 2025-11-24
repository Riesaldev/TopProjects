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
exports.ReportsGeneratedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_generated_entity_1 = require("../../database/entities/report-generated.entity");
let ReportsGeneratedService = class ReportsGeneratedService {
    reportsGeneratedRepository;
    constructor(reportsGeneratedRepository) {
        this.reportsGeneratedRepository = reportsGeneratedRepository;
    }
    async findAll() {
        return this.reportsGeneratedRepository.find();
    }
    async findOne(id) {
        const report = await this.reportsGeneratedRepository.findOneBy({ id });
        if (!report)
            throw new common_1.NotFoundException('Report generated not found');
        return report;
    }
    async create(createReportGeneratedDto) {
        const report = this.reportsGeneratedRepository.create(createReportGeneratedDto);
        return this.reportsGeneratedRepository.save(report);
    }
    async update(id, updateReportGeneratedDto) {
        const report = await this.findOne(id);
        Object.assign(report, updateReportGeneratedDto);
        return this.reportsGeneratedRepository.save(report);
    }
    async remove(id) {
        const report = await this.findOne(id);
        await this.reportsGeneratedRepository.remove(report);
    }
};
exports.ReportsGeneratedService = ReportsGeneratedService;
exports.ReportsGeneratedService = ReportsGeneratedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_generated_entity_1.ReportGenerated)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsGeneratedService);
//# sourceMappingURL=reports-generated.service.js.map