import mysql, { type Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_CONNECTION_LIMIT } = process.env;

let pool: Pool | null = null;

export const getPool = async (): Promise<Pool | null> => {
  try {
    // Paso 1: si no tenemos un pool creado, lo inicializamos
    if (!pool) {
      const connection = await mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;`);
      await connection.end();

      // Paso 2: creamos el pool con opciones de conexión
      const limit = MYSQL_CONNECTION_LIMIT ? parseInt(MYSQL_CONNECTION_LIMIT) : 10;
      pool = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        connectionLimit: Number.isFinite(limit) ? limit : 10,
        timezone: 'Z',
      });
      console.log('Conexión a la base de datos establecida');
    }
    return pool;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

