// Inicializa la base de datos y crea las tablas necesarias para guardar usuarios, pj/pnjs, imágenes y archivos


import { getPool } from './getPool.ts';

export const initDb = async () => {
  try {
    const pool = await getPool();
    if (!pool) {
      throw new Error('No se pudo establecer la conexión a la base de datos');
    }
    console.log('Conexión a la base de datos establecida');

    await pool.query(`DROP TABLE IF EXISTS tokens, resources, characters, campaigns, users`);
    console.log('Tablas eliminadas si existían');

    console.log('Creando tablas...');

    await pool.query(`

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        recoverPassword VARCHAR(100),
        recoverPasswordExpires DATETIME NULL,
        avatar VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Tabla users creada');

    await pool.query(`

      CREATE TABLE IF NOT EXISTS campaigns(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        gm_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(gm_id) REFERENCES users(id)
      );
    `);

    console.log('Tabla campaigns creada');

    await pool.query(`

    CREATE TABLE IF NOT EXISTS characters(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image_url TEXT,
      user_id INT NOT NULL,
      campaign_id INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(campaign_id) REFERENCES campaigns(id)
    );
  `);

    console.log('Tabla characters creada');

    await pool.query(`


    CREATE TABLE IF NOT EXISTS resources(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      type ENUM('image', 'audio', 'pdf', 'other') DEFAULT 'image',
      url TEXT NOT NULL,
      campaign_id INT NOT NULL,
      uploaded_by INT NULL,
      FOREIGN KEY(campaign_id) REFERENCES campaigns(id),
      FOREIGN KEY(uploaded_by) REFERENCES users(id)
    );
  `);

    console.log('Tabla resources creada');

    await pool.query(`

    CREATE TABLE IF NOT EXISTS tokens(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image_url TEXT,
      character_id INT,
      campaign_id INT NOT NULL,
      user_id INT NOT NULL,
      FOREIGN KEY(character_id) REFERENCES characters(id),
      FOREIGN KEY(campaign_id) REFERENCES campaigns(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

    console.log('Tabla tokens creada');
    console.log('Todas las tablas creadas correctamente');

    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

initDb();
