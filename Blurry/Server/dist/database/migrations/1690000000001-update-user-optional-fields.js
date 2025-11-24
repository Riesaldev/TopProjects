"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserOptionalFields1690000000001 = void 0;
class UpdateUserOptionalFields1690000000001 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE users 
      MODIFY COLUMN age INT NULL,
      MODIFY COLUMN gender VARCHAR(255) NULL,
      MODIFY COLUMN location VARCHAR(255) NULL,
      MODIFY COLUMN values_profile JSON NULL
    `);
        await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN bio TEXT NULL,
      ADD COLUMN interests TEXT NULL,
      ADD COLUMN imagen_perfil VARCHAR(500) NULL,
      ADD COLUMN tokens INT DEFAULT 0
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN bio,
      DROP COLUMN interests,
      DROP COLUMN imagen_perfil,
      DROP COLUMN tokens
    `);
        await queryRunner.query(`
      ALTER TABLE users 
      MODIFY COLUMN age INT NOT NULL,
      MODIFY COLUMN gender VARCHAR(255) NOT NULL,
      MODIFY COLUMN location VARCHAR(255) NOT NULL,
      MODIFY COLUMN values_profile JSON NOT NULL
    `);
    }
}
exports.UpdateUserOptionalFields1690000000001 = UpdateUserOptionalFields1690000000001;
//# sourceMappingURL=1690000000001-update-user-optional-fields.js.map