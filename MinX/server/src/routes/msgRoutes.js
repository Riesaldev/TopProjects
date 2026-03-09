/**
 * Rutas del dominio mensajes.
 * Qué: CRUD de mensajes y sistema de likes.
 * Cómo: se protege creación/borrado/like con authUser; lectura puede ser opcional.
 * Por qué: núcleo social de la aplicación.
 */
import express from 'express';

import {
  newMsg,
  deleteLikeMsg,
  listMsg,
  likeMsg,
  deleteMsg,
  detailMsg,
} from '../controllers/messages/index.js';

import msgExists from '../middlewares/messageExist.js';

import authUser from '../middlewares/authUser.js';
import authUserOpcinal from '../middlewares/authUserOpcional.js';

const router = express.Router();

/**
 * POST /
 * Qué: crear nuevo mensaje.
 * Cómo: requiere usuario autenticado, procesa posible imagen.
 * Por qué: publicar contenido.
 */
router.post( '', authUser, newMsg );

/**
 * GET /
 * Qué: listar mensajes recientes.
 * Cómo: autenticación opcional para marcar likedByMe.
 * Por qué: feed principal; si hay req.user se personaliza.
 */
router.get( '', authUserOpcinal, listMsg );

/**
 * GET /:msgId
 * Qué: detalle de un mensaje específico.
 * Cómo: verifica existencia y añade info contextual (likedByMe).
 * Por qué: vista individual o modal de detalle.
 */
router.get( '/:msgId', authUserOpcinal, msgExists, detailMsg );

/**
 * POST /:msgId/likes
 * Qué: añadir un like del usuario actual.
 * Cómo: comprueba existencia y evita duplicados (modelo lanza error si ya existe).
 * Por qué: interacción social básica.
 */
router.post( '/:msgId/likes', authUser, msgExists, likeMsg );

/**
 * DELETE /:msgId
 * Qué: borrar mensaje propio.
 * Cómo: auth + verificación de propiedad en modelo.
 * Por qué: control sobre el propio contenido.
 */
router.delete( '/:msgId', authUser, msgExists, deleteMsg );

/**
 * DELETE /:msgId/likes
 * Qué: retirar like previamente dado.
 * Cómo: auth + existencia; operación idempotente (modelo devuelve recuento actualizado).
 * Por qué: revertir interacciones.
 */
router.delete( '/:msgId/likes', authUser, msgExists, deleteLikeMsg );

export default router;