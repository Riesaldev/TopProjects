
import mysql from 'mysql2/promise';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Singleton de pool para reutilizar conexiones y evitar overhead de crearlas en cada query.
let pool;

/**
 * Obtiene (o inicializa la primera vez) un pool de conexiones MySQL.
 * Qué: asegura existencia de la base de datos y crea un pool configurable.
 * Cómo: crea una conexión temporal para CREATE DATABASE y luego un pool con connectionLimit.
 * Por qué: mejora rendimiento y centraliza configuración (timezone, límites, credenciales).
 */
const getPool = async () => {
  try
  {
    if ( !pool )
    {
      const dbConnection = await mysql.createConnection( {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
      } );

      await dbConnection.query( `CREATE DATABASE IF NOT EXISTS ${ MYSQL_DB }` );

      pool = mysql.createPool( {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        connectionLimit: 10,
        timezone: 'Z', // UTC para coherencia en timestamps.
      } );
    }
    return await pool;
  } catch ( err )
  {
    console.error( err );
  }
};

export default getPool;