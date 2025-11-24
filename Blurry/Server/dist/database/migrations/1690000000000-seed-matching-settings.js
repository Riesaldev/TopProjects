"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedMatchingSettings1690000000000 = void 0;
class SeedMatchingSettings1690000000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      INSERT INTO settings (key, value, updated_by) VALUES
        ('matching_threshold', '0.7', 'admin'),
        ('max_distance_km', '50', 'admin'),
        ('age_difference_max', '5', 'admin');
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DELETE FROM settings WHERE key IN ('matching_threshold', 'max_distance_km', 'age_difference_max');
    `);
    }
}
exports.SeedMatchingSettings1690000000000 = SeedMatchingSettings1690000000000;
//# sourceMappingURL=1690000000000-seed-matching-settings.js.map