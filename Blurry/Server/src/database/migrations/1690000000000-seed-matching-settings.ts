import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMatchingSettings1690000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO settings (key, value, updated_by) VALUES
        ('matching_threshold', '0.7', 'admin'),
        ('max_distance_km', '50', 'admin'),
        ('age_difference_max', '5', 'admin');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM settings WHERE key IN ('matching_threshold', 'max_distance_km', 'age_difference_max');
    `);
  }
}
