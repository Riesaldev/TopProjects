import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPricingToGamesAndServices1690000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add pricing to games catalog if missing.
    await queryRunner.query(`
      ALTER TABLE games
      ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0
    `).catch(() => undefined);

    await queryRunner.query(`
      UPDATE games
      SET price = CASE
        WHEN LOWER(COALESCE(category, 'game')) = 'test' THEN 4.99
        ELSE 7.99
      END
      WHERE price IS NULL OR price = 0
    `);

    // Add pricing to services catalog if missing.
    await queryRunner.query(`
      ALTER TABLE services_status
      ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0
    `).catch(() => undefined);

    await queryRunner.query(`
      UPDATE services_status
      SET price = CASE
        WHEN LOWER(nombre) LIKE '%verific%' THEN 9.99
        WHEN LOWER(nombre) LIKE '%boost%' OR LOWER(nombre) LIKE '%destac%' THEN 11.99
        WHEN LOWER(nombre) LIKE '%video%' THEN 8.99
        ELSE 6.99
      END
      WHERE price IS NULL OR price = 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE services_status DROP COLUMN price`).catch(() => undefined);
    await queryRunner.query(`ALTER TABLE games DROP COLUMN price`).catch(() => undefined);
  }
}
