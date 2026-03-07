const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'blurry',
    connectTimeout: 5000,
  });

  const statements = [
    `CREATE TABLE IF NOT EXISTS feedback (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      match_id INT NOT NULL,
      rating INT NOT NULL,
      comment VARCHAR(255) NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS activity_logs (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      action VARCHAR(255) NOT NULL,
      metadata JSON NULL,
      created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS reports (
      id INT NOT NULL AUTO_INCREMENT,
      reported_user_id INT NOT NULL,
      type VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      admin_notes VARCHAR(255) NULL,
      created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS sanctions (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NULL,
      usuario VARCHAR(255) NULL,
      sancion VARCHAR(255) NOT NULL,
      estado VARCHAR(255) NOT NULL DEFAULT 'Activa',
      fecha DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS matches (
      id INT NOT NULL AUTO_INCREMENT,
      user_a_id INT NOT NULL,
      user_b_id INT NOT NULL,
      score INT NULL,
      status VARCHAR(255) NOT NULL,
      match_date DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS services_status (
      id INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL,
      estado VARCHAR(255) NOT NULL DEFAULT 'Activo',
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,
  ];

  for (const statement of statements) {
    await conn.query(statement);
  }

  try {
    await conn.query('ALTER TABLE services_status ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0');
  } catch (_) {
    // Column already exists; ignore.
  }

  const [tables] = await conn.query('SHOW TABLES');
  console.log('SCHEMA_PATCH_APPLIED, tables:', tables.length);

  await conn.end();
}

main().catch((error) => {
  console.error('PATCH_ERROR', error.code || error.message);
  process.exit(1);
});
