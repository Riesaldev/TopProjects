import generateError from '../../utils/generateErrorUtil.js';
import getContactRequestBetweenUsersModel from '../../models/contacts/getContactRequestBetweenUsersModel.js';
import insertPrivateMessageModel from '../../models/contacts/insertPrivateMessageModel.js';

const MAX_MESSAGE_LENGTH = 500;

const sendPrivateMessageController = async ( req, res, next ) => {
  try
  {
    const senderId = req.user.id;
    const { userId: peerParam } = req.params;
    const receiverId = Number( peerParam );

    if ( Number.isNaN( receiverId ) )
    {
      generateError( 'Parámetro inválido', 400 );
    }

    const { content } = req.body;
    const trimmedContent = typeof content === 'string' ? content.trim() : '';
    if ( !trimmedContent )
    {
      generateError( 'El mensaje no puede estar vacío', 400 );
    }
    if ( trimmedContent.length > MAX_MESSAGE_LENGTH )
    {
      generateError( `El mensaje supera el máximo de ${ MAX_MESSAGE_LENGTH } caracteres`, 400 );
    }

    const contact = await getContactRequestBetweenUsersModel( senderId, receiverId );
    if ( !contact || contact.status !== 'accepted' )
    {
      generateError( 'Debes tener al usuario en tu agenda', 403 );
    }

    const message = await insertPrivateMessageModel( senderId, receiverId, trimmedContent );

    res.status( 201 ).send( {
      status: 'ok',
      data: message,
    } );
  } catch ( err )
  {
    next( err );
  }
};

export default sendPrivateMessageController;

