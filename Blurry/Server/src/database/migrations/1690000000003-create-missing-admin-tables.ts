import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMissingAdminTables1690000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        match_id INT NOT NULL,
        rating INT NOT NULL,
        comment VARCHAR(255) NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        metadata JSON NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT NOT NULL AUTO_INCREMENT,
        reported_user_id INT NOT NULL,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        admin_notes VARCHAR(255) NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS sanctions (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NULL,
        usuario VARCHAR(255) NULL,
        sancion VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL DEFAULT 'Activa',
        fecha DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS matches (
        id INT NOT NULL AUTO_INCREMENT,
        user_a_id INT NOT NULL,
        user_b_id INT NOT NULL,
        score INT NULL,
        status VARCHAR(255) NOT NULL,
        match_date DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS services_status (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL DEFAULT 'Activo',
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS services_status`);
    await queryRunner.query(`DROP TABLE IF EXISTS matches`);
    await queryRunner.query(`DROP TABLE IF EXISTS sanctions`);
    await queryRunner.query(`DROP TABLE IF EXISTS reports`);
    await queryRunner.query(`DROP TABLE IF EXISTS activity_logs`);
    await queryRunner.query(`DROP TABLE IF EXISTS feedback`);
  }
}
