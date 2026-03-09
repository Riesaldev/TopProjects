
import jwt from 'jsonwebtoken';

import generateError from '../utils/generateErrorUtil.js';

/**
 * Autenticación opcional.
 * Qué: si hay token válido añade req.user; si no lo hay continúa sin error.
 * Cómo: intenta verificar JWT; si falla y existía header -> lanza error (token malformado o inválido);
 *       si no había header, omite autenticación silenciosamente.
 * Por qué: endpoints públicos que personalizan respuesta (ej: likedByMe) si el usuario está logado.
 */
const authUserOptional = async ( req, res, next ) => {
    try
    {
        const { authorization } = req.headers;

        if ( authorization )
        {
            try
            {
                const tokenInfo = jwt.verify( authorization, process.env.JWT_SECRET || process.env.SECRET );
                req.user = { id: tokenInfo.id };
            } catch ( err )
            {
                // Distinguimos caso: se intentó autenticar pero el token es inválido.
                console.log( '[authUserOptional] token inválido:', err.message );
                generateError( 'Token inválido', 403 );
            }
        }
        next();
    } catch ( err )
    {
        next( err );
    }
};

export default authUserOptional;