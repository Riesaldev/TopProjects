import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import generateError from '../utils/generateErrorUtil.js';
import getContactRequestBetweenUsersModel from '../models/contacts/getContactRequestBetweenUsersModel.js';
import insertPrivateMessageModel from '../models/contacts/insertPrivateMessageModel.js';
import { addOnlineUser, removeOnlineUser } from './presenceStore.js';

const clients = new Map(); // userId -> Set<ws>

const registerClient = ( userId, ws ) => {
  if ( !clients.has( userId ) )
  {
    clients.set( userId, new Set() );
  }
  clients.get( userId ).add( ws );
};

const unregisterClient = ( userId, ws ) => {
  const set = clients.get( userId );
  if ( set )
  {
    set.delete( ws );
    if ( set.size === 0 ) clients.delete( userId );
  }
};

const parseTokenFromRequest = ( req ) => {
  const url = new URL( req.url, `http://${ req.headers.host }` );
  return url.searchParams.get( 'token' );
};

const initChatServer = ( httpServer ) => {
  const wss = new WebSocketServer( { server: httpServer, path: '/ws/chat' } );
  const { JWT_SECRET } = process.env;

  if ( !JWT_SECRET )
  {
    throw new Error( 'JWT_SECRET es requerido para el servidor WS' );
  }

  wss.on( 'connection', async ( ws, req ) => {
    try
    {
      const token = parseTokenFromRequest( req );
      if ( !token )
      {
        ws.close( 4001, 'Token requerido' );
        return;
      }

      let payload;
      try
      {
        payload = jwt.verify( token, JWT_SECRET );
      } catch ( err )
      {
        ws.close( 4002, 'Token inválido' );
        return;
      }

      const userId = payload.id || payload.userId;
      if ( !userId )
      {
        ws.close( 4003, 'Token sin userId' );
        return;
      }

      registerClient( userId, ws );
      addOnlineUser( userId );

      ws.on( 'message', async ( raw ) => {
        try
        {
          const data = JSON.parse( raw.toString() );
          if ( data.type !== 'private-message' )
          {
            return;
          }
          const receiverId = Number( data.to );
          const content = typeof data.content === 'string' ? data.content.trim() : '';

          if ( !receiverId || !content )
          {
            throw generateError( 'Mensaje inválido', 400 );
          }

          const contact = await getContactRequestBetweenUsersModel( userId, receiverId );
          if ( !contact || contact.status !== 'accepted' )
          {
            throw generateError( 'No estás conectado con este usuario', 403 );
          }

          const stored = await insertPrivateMessageModel( userId, receiverId, content.slice( 0, 500 ) );
          const payloadMessage = {
            type: 'private-message',
            data: {
              id: stored.id,
              senderId: userId,
              receiverId,
              content,
              createdAt: new Date().toISOString(),
            },
          };

          const receiverClients = clients.get( receiverId );
          const senderClients = clients.get( userId );
          if ( receiverClients )
          {
            receiverClients.forEach( ( client ) => client.send( JSON.stringify( payloadMessage ) ) );
          }
          if ( senderClients )
          {
            senderClients.forEach( ( client ) => {
              if ( client !== ws )
              {
                client.send( JSON.stringify( payloadMessage ) );
              }
            } );
          }

          ws.send( JSON.stringify( payloadMessage ) );
        } catch ( err )
        {
          const message = err?.message || 'Error enviando mensaje privado';
          ws.send( JSON.stringify( { type: 'error', message } ) );
        }
      } );

      ws.on( 'close', () => {
        unregisterClient( userId, ws );
        removeOnlineUser( userId );
      } );
    } catch ( err )
    {
      ws.close( 1011, 'Error interno' );
    }
  } );

  return wss;
};

export default initChatServer;

