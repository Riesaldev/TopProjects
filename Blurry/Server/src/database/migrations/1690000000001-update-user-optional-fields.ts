import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserOptionalFields1690000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hacer que los campos age, gender, location sean opcionales
    await queryRunner.query(`
      ALTER TABLE users 
      MODIFY COLUMN age INT NULL,
      MODIFY COLUMN gender VARCHAR(255) NULL,
      MODIFY COLUMN location VARCHAR(255) NULL,
      MODIFY COLUMN values_profile JSON NULL
    `);

    // Agregar nuevos campos opcionales
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN bio TEXT NULL,
      ADD COLUMN interests TEXT NULL,
      ADD COLUMN imagen_perfil VARCHAR(500) NULL,
      ADD COLUMN tokens INT DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios - eliminar nuevos campos
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN bio,
      DROP COLUMN interests,
      DROP COLUMN imagen_perfil,
      DROP COLUMN tokens
    `);

    // Hacer que los campos sean requeridos nuevamente
    await queryRunner.query(`
      ALTER TABLE users 
      MODIFY COLUMN age INT NOT NULL,
      MODIFY COLUMN gender VARCHAR(255) NOT NULL,
      MODIFY COLUMN location VARCHAR(255) NOT NULL,
      MODIFY COLUMN values_profile JSON NOT NULL
    `);
  }
}
