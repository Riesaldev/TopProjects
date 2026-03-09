
import jwt from 'jsonwebtoken';
import generateError from '../utils/generateErrorUtil.js';

/**
 * Middleware de autenticación estricta.
 * Qué: valida presencia y validez de un token JWT y adjunta su info al objeto req.
 * Cómo: lee header Authorization (sin prefijo Bearer), verifica con la clave JWT_SECRET.
 * Por qué: proteger endpoints que requieren identidad (creación/borrado de recursos, perfil privado).
 */
const authUser = async ( req, res, next ) => {
  try
  {
    const { authorization } = req.headers;

    // Validamos que se proporcione token.
    if ( !authorization )
    {
      generateError( 'No se proporcionó un token', 401 );
    }

    // Permitimos fallback a SECRET para compatibilidad retro (si existiera config anterior).
    const secret = process.env.JWT_SECRET || process.env.SECRET;
    if ( !secret )
    {
      generateError( 'Falta la variable de entorno JWT_SECRET', 500 );
    }

    try
    {
      // Verificación y extracción de payload.
      const tokenInfo = jwt.verify( authorization, secret );
      // Anexamos solo la info necesaria (principio de mínima exposición).
      req.user = { id: tokenInfo.id };
      next();
    } catch ( err )
    {
      console.error( 'Error verificando token:', err.message );
      generateError( 'Token inválido o expirado', 403 );
    }
  } catch ( err )
  {
    next( err );
  }
};

export default authUser;
