
// Barrel file de controladores de mensajes.
// Qué: centraliza exportaciones de acciones CRUD/likes.
// Por qué: simplifica import en rutas y mantiene consistencia.
import newMsg from './newMsg.js';
import deleteLikeMsg from './deleteLikeMsg.js';
import listMsg from './listMsg.js';
import likeMsg from './likeMsg.js';
import deleteMsg from './deleteMsg.js';
import detailMsg from './detailMsg.js';

export {
  newMsg,
  deleteLikeMsg,
  listMsg,
  likeMsg,
  deleteMsg,
  detailMsg,
};
