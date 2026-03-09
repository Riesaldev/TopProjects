
import getPool from '../../db/getPool.js';

/**
 * Inserta un mensaje en la tabla messages.
 * Qué: persiste userId, texto y nombre de imagen opcional.
 * Cómo: INSERT parametrizado; retorna insertId para referencia inmediata.
 * Por qué: necesario para responder con ID y permitir acciones posteriores (detalle, edición futura).
 */
const insertMessage = async ( userId, text, imgName ) => {
  const pool = await getPool();

  const [ result ] = await pool.query(
    'INSERT INTO messages (userId, text, image) VALUES (?, ?, ?)',
    [ userId, text, imgName ]
  );

  return result.insertId;
};

export default insertMessage;