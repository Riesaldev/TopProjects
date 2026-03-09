
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

/**
 * Perfil privado del usuario autenticado.
 * Qué: retorna datos completos (incluye email que no sería público en un perfil público).
 * Cómo: usa req.user.id inyectado por authUser y consulta el modelo.
 * Por qué: necesaria para área de configuración / dashboard personal.
 */
const getPrivateUserProfileController = async ( req, res, next ) => {
  try
  {
    const user = await selectUserByIdModel( req.user.id );

    res.send( {
      status: 'ok',
      data: {
        user
      }
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default getPrivateUserProfileController;