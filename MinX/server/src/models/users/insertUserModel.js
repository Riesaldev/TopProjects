import bcrypt from 'bcrypt';

import getPool from '../../db/getPool.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Inserta un usuario nuevo en la base de datos.
 * Qué: comprueba unicidad de username y email y guarda hash de la contraseña.
 * Cómo: dos queries de verificación + hash BCrypt con salt rounds = 10.
 * Por qué: garantizar integridad (no duplicados) y seguridad (no almacenar password plano).
 */
const insertUserModel = async ( username, email, password ) => {
  const pool = await getPool();

  let [ users ] = await pool.query( `SELECT id FROM users WHERE username = ?`, [ username ] );
  if ( users.length > 0 )
  {
    generateError( 'Nombre de usuario ya en uso', 409 );
  }

  [ users ] = await pool.query( `SELECT id FROM users WHERE email = ?`, [ email ] );
  if ( users.length > 0 )
  {
    generateError( 'Email ya en uso', 409 );
  }

  const hashedPass = await bcrypt.hash( password, 10 );

  const [ result ] = await pool.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [ username, email, hashedPass ]
  );
  return result.insertId;
};

export default insertUserModel;
