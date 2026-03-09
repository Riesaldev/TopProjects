
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import selectUserByUsernameModel from '../../models/users/selectUserByUsernameModel.js';
import generateError from '../../utils/generateErrorUtil.js';

/**
 * Login de usuario.
 * Qué: autentica contra email o username y emite JWT.
 * Cómo: detecta si el identificador contiene '@' para decidir búsqueda por email, si no por username.
 * Por qué: mejora UX permitiendo un único campo de login (flexibilidad future-proof con 'identifier').
 */
const loginUserController = async ( req, res, next ) => {
  try
  {
    let { email, password, username } = req.body;

    // Unificación de credenciales: se permite email, username o un campo futuro 'identifier'.
    const identifier = email || username || req.body?.identifier;

    if ( !identifier || !password )
    {
      generateError( 'Faltan campos por completar', 400 );
    }
    let user;
    if ( identifier.includes( '@' ) )
    {
      user = await selectUserByEmailModel( identifier );
    } else
    {
      user = await selectUserByUsernameModel( identifier );
    }

    const isPassValid = user && ( await bcrypt.compare( password, user.password ) );

    if ( !isPassValid || !user )
    {
      generateError( 'Credenciales incorrectas', 403 );
    }

    const tokenInfo = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    // Firmamos JWT con expiración para obligar a renovar sesión (7 días mitigando tokens robados antiguos).
    const token = jwt.sign( tokenInfo, process.env.JWT_SECRET, {
      expiresIn: '7d'
    } );

    res.send( {
      status: 'ok',
      data: {
        token
      }
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default loginUserController;