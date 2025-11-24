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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("../../database/entities/report.entity");
let ReportsService = class ReportsService {
    reportsRepository;
    constructor(reportsRepository) {
        this.reportsRepository = reportsRepository;
    }
    async findAll() {
        return this.reportsRepository.find();
    }
    async findOne(id) {
        const report = await this.reportsRepository.findOneBy({ id });
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        return report;
    }
    async create(createReportDto) {
        const report = this.reportsRepository.create(createReportDto);
        return this.reportsRepository.save(report);
    }
    async update(id, updateReportDto) {
        const report = await this.findOne(id);
        Object.assign(report, updateReportDto);
        return this.reportsRepository.save(report);
    }
    async remove(id) {
        const report = await this.findOne(id);
        await this.reportsRepository.remove(report);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map