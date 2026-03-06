import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueGamesNameCategory1690000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove duplicated rows first so adding the unique index is safe.
    await queryRunner.query(`
      DELETE g1
      FROM games g1
      INNER JOIN games g2
        ON LOWER(TRIM(g1.name)) = LOWER(TRIM(g2.name))
        AND LOWER(TRIM(g1.category)) = LOWER(TRIM(g2.category))
        AND g1.id > g2.id
    `);

    await queryRunner.query(`
      ALTER TABLE games
      ADD CONSTRAINT UQ_games_name_category UNIQUE (name, category)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE games
      DROP INDEX UQ_games_name_category
    `);
  }
}
