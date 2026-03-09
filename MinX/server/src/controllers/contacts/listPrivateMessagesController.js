import generateError from '../../utils/generateErrorUtil.js';
import getContactRequestBetweenUsersModel from '../../models/contacts/getContactRequestBetweenUsersModel.js';
import listPrivateMessagesModel from '../../models/contacts/listPrivateMessagesModel.js';

const listPrivateMessagesController = async ( req, res, next ) => {
  try
  {
    const userId = req.user.id;
    const { userId: peerParam } = req.params;
    const peerId = Number( peerParam );

    if ( Number.isNaN( peerId ) )
    {
      generateError( 'Parámetro inválido', 400 );
    }

    const contact = await getContactRequestBetweenUsersModel( userId, peerId );

    if ( !contact || contact.status !== 'accepted' )
    {
      generateError( 'Debes ser contacto para ver esta conversación', 403 );
    }

    const messages = await listPrivateMessagesModel( userId, peerId );

    res.send( {
      status: 'ok',
      data: messages,
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default listPrivateMessagesController;

