import 'dotenv/config';

import getPool from './getPool.js';

/**
 * Script de inicialización de base de datos.
 * Qué: recrea el esquema completamente (DROP + CREATE) para entornos de desarrollo/testing.
 * Cómo: elimina tablas en orden de dependencias y vuelve a crearlas con constraints.
 * Por qué: asegurar estado limpio reproducible durante desarrollo.
 * NOTA: No debe ejecutarse en producción porque destruye datos.
 */
const initDb = async () => {
  try
  {
    const pool = await getPool();

    console.log( 'Borrando tablas si existen...' );
    await pool.query( `DROP TABLE IF EXISTS private_messages, contact_requests, likes, messages, users` );

    console.log( 'Creando tablas...' );
    // Tabla de usuarios: almacena credenciales y metadatos de perfil.
    await pool.query( `
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        avatar VARCHAR(255),
        bio VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Tabla de mensajes: referencia usuario y puede tener imagen.
    await pool.query( `
      CREATE TABLE IF NOT EXISTS messages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId INT UNSIGNED NOT NULL,
        text VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Tabla de likes: relación N:M (userId-messageId) controlada con UNIQUE para evitar duplicados.
    await pool.query( `
      CREATE TABLE IF NOT EXISTS likes (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId INT UNSIGNED NOT NULL,
        messageId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (messageId) REFERENCES messages(id) ON DELETE CASCADE,
        UNIQUE (userId, messageId),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query( `
      CREATE TABLE IF NOT EXISTS contact_requests (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        requesterId INT UNSIGNED NOT NULL,
        requestedId INT UNSIGNED NOT NULL,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_request (requesterId, requestedId),
        FOREIGN KEY (requesterId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (requestedId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query( `
      CREATE TABLE IF NOT EXISTS private_messages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        senderId INT UNSIGNED NOT NULL,
        receiverId INT UNSIGNED NOT NULL,
        content VARCHAR(500) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log( 'Tablas creadas!!' );
    process.exit( 0 );
  } catch ( err )
  {
    console.error( err );
    process.exit( 1 );
  }
};

initDb();