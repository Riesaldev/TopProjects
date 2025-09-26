import { getPool } from '@/db/getPool.ts';
import { beforeAll } from 'vitest';

// Inicializa BD efímera (usa misma config; en entorno real podrías apuntar a otra).
beforeAll(async () => {
  const pool = await getPool();
  if (!pool) throw new Error('Sin pool');
  // Aseguramos tablas mínimas necesarias para tests actuales
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    recoverPassword VARCHAR(100),
    recoverPasswordExpires DATETIME NULL,
    avatar VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
});
