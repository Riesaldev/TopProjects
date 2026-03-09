import searchUsersModel from '../../models/users/searchUsersModel.js';
import generateError from '../../utils/generateErrorUtil.js';

const searchUsersController = async ( req, res, next ) => {
  try
  {
    const { q } = req.query;
    if ( !q || q.trim().length < 2 )
    {
      generateError( 'Debes indicar al menos 2 caracteres para buscar', 400 );
    }

    const users = await searchUsersModel( q.trim(), req.user.id );
    res.send( {
      status: 'ok',
      data: users
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default searchUsersController;

