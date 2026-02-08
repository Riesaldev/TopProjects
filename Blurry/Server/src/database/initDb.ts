import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'blurry';

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();
  console.log(`Base de datos '${DB_NAME}' verificada/creada.`);
}

export async function initializeDatabase(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  // Verificar si ya existen usuarios
  const existingUsers = await userRepository.count();
  
  if (existingUsers === 0) {
    console.log('Inicializando base de datos con usuarios por defecto...');

    // Crear usuario por defecto
    const defaultUserPassword = await bcrypt.hash('password123', 10);
    const defaultUser = new User();
    defaultUser.email = 'user@example.com';
    defaultUser.password_hash = defaultUserPassword;
    defaultUser.role = 'user';
    defaultUser.display_name = 'Usuario Demo';
    defaultUser.age = 25;
    defaultUser.gender = 'male';
    defaultUser.location = 'Ciudad de México';
    defaultUser.values_profile = {};

    // Crear administrador por defecto
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User();
    adminUser.email = 'admin@example.com';
    adminUser.password_hash = adminPassword;
    adminUser.role = 'admin';
    adminUser.display_name = 'Administrador';
    adminUser.age = 30;
    adminUser.gender = 'female';
    adminUser.location = 'Guadalajara';
    adminUser.values_profile = {};

    await userRepository.save([defaultUser, adminUser]);
    console.log('Usuarios por defecto creados exitosamente');
    console.log('Usuario demo: user@example.com / password123');
    console.log('Admin: admin@example.com / admin123');
  }
}

(async () => {
  try {
    await createDatabaseIfNotExists();
    const AppDataSource = new DataSource({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [User],
      synchronize: true, // Solo para crear tablas si no existen
    });
    
    await AppDataSource.initialize();
    await initializeDatabase(AppDataSource);
    await AppDataSource.destroy();
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    process.exit(1);
  }
})();