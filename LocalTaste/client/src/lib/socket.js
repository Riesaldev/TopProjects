import { io } from 'socket.io-client';
import { get as getCookie, remove as removeCookie } from 'js-cookie';

/**
 * @fileoverview Configuración de Socket.io para LocalTaste - Sistema de notificaciones en tiempo real
 * Proporciona comunicación bidireccional entre cliente y servidor para notificaciones instantáneas,
 * actualizaciones de pedidos, alertas de stock y eventos del marketplace LocalTaste
 * @author LocalTaste Development Team
 * @version 1.0.0
 * @since 2025-12-19
 */

// ================================
// EVENTOS DE SOCKET Y CONSTANTES
// ================================

/**
 * Eventos de socket para LocalTaste - Marketplace de productos locales
 * @readonly
 * @enum {string}
 */
export const SOCKET_EVENTS = {
  // === EVENTOS DE CONEXIÓN ===
  /** Socket se conecta al servidor */
  CONNECT: 'connect',
  /** Socket se desconecta del servidor */
  DISCONNECT: 'disconnect',
  /** Error en la conexión */
  CONNECT_ERROR: 'connect_error',
  /** Error de autenticación */
  AUTH_ERROR: 'auth_error',

  // === EVENTOS DE SALAS ===
  /** Unirse a sala de usuario */
  JOIN_USER_ROOM: 'join_user_room',
  /** Unirse a sala de productor */
  JOIN_PRODUCER_ROOM: 'join_producer_room',
  /** Salir de una sala */
  LEAVE_ROOM: 'leave_room',

  // === EVENTOS DE PEDIDOS (PRODUCTORES) ===
  /** Nuevo pedido recibido - HU05: Notificaciones para productores */
  NEW_ORDER: 'new_order',
  /** Confirmación de pedido desde productor */
  CONFIRM_ORDER: 'confirm_order',
  /** Actualización de estado de pedido */
  UPDATE_ORDER_STATUS: 'update_order_status',

  // === EVENTOS DE PEDIDOS (CONSUMIDORES) ===
  /** Actualización de estado para consumidores */
  ORDER_STATUS_UPDATE: 'order_status_update',

  // === EVENTOS DE SUSCRIPCIONES ===
  /** Actualización en suscripciones - HU02: Cestas personalizadas */
  SUBSCRIPTION_UPDATE: 'subscription_update',

  // === EVENTOS DE NOTIFICACIONES ===
  /** Notificación general del sistema */
  NOTIFICATION: 'notification',
  /** Marcar notificación como leída */
  MARK_NOTIFICATION_READ: 'mark_notification_read',

  // === EVENTOS DE INVENTARIO ===
  /** Alerta de stock bajo para productores - HU04: Gestión inventario */
  STOCK_ALERT: 'stock_alert',

  // === EVENTOS DE USUARIO ===
  /** Usuario se conecta al sistema */
  USER_CONNECTED: 'user_connected',
  /** Usuario se desconecta del sistema */
  USER_DISCONNECTED: 'user_disconnected',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( SOCKET_EVENTS );

/**
 * Estados de conexión del socket
 * @readonly
 * @enum {string}
 */
export const CONNECTION_STATUS = {
  /** Socket está conectando */
  CONNECTING: 'connecting',
  /** Socket conectado exitosamente */
  CONNECTED: 'connected',
  /** Socket desconectado */
  DISCONNECTED: 'disconnected',
  /** Error en la conexión */
  ERROR: 'error',
  /** Reconectando automáticamente */
  RECONNECTING: 'reconnecting',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( CONNECTION_STATUS );

/**
 * Tipos de salas disponibles en LocalTaste
 * @readonly
 * @enum {string}
 */
export const ROOM_TYPES = {
  /** Sala individual de usuario para notificaciones personales */
  USER: 'user',
  /** Sala de productor para pedidos y alertas de stock */
  PRODUCER: 'producer',
  /** Sala de administradores para moderación */
  ADMIN: 'admin',
  /** Sala global para anuncios del sistema */
  GLOBAL: 'global',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( ROOM_TYPES );

/**
 * Tipos de notificaciones en tiempo real
 * @readonly
 * @enum {string}
 */
export const NOTIFICATION_TYPES = {
  /** Nuevo pedido para productor */
  NEW_ORDER: 'new_order',
  /** Estado de pedido actualizado */
  ORDER_UPDATE: 'order_update',
  /** Suscripción modificada */
  SUBSCRIPTION_CHANGE: 'subscription_change',
  /** Alerta de stock bajo */
  LOW_STOCK: 'low_stock',
  /** Nueva reseña recibida */
  NEW_REVIEW: 'new_review',
  /** Notificación del sistema */
  SYSTEM: 'system',
  /** Moderación requerida (admin) */
  MODERATION: 'moderation',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( NOTIFICATION_TYPES );

// ================================
// CONFIGURACIÓN DE SOCKET
// ================================

/**
 * Configuración segura de Socket.io para LocalTaste
 * @readonly
 */
export const SOCKET_CONFIG = {
  /** Configuración de reconexión automática */
  RECONNECTION: {
    /** Habilitar reconexión automática */
    enabled: true,
    /** Delay inicial de reconexión (ms) */
    delay: 1000,
    /** Delay máximo de reconexión (ms) */
    delayMax: 5000,
    /** Máximo número de intentos de reconexión */
    maxAttempts: 5,
  },

  /** Configuración de timeout y conexión */
  CONNECTION: {
    /** Timeout de conexión (ms) */
    timeout: 20000,
    /** Forzar nueva conexión */
    forceNew: false,
    /** Auto conectar al instanciar */
    autoConnect: true,
  },

  /** Configuración de seguridad */
  SECURITY: {
    /** Nombre de la cookie de autenticación */
    authCookie: 'auth_token',
    /** Verificar certificados SSL en producción */
    rejectUnauthorized: true,
    /** Habilitar compresión */
    compression: true,
  },
};

// Congelar configuración para prevenir modificaciones
Object.freeze( SOCKET_CONFIG.RECONNECTION );
Object.freeze( SOCKET_CONFIG.CONNECTION );
Object.freeze( SOCKET_CONFIG.SECURITY );
Object.freeze( SOCKET_CONFIG );

/**
 * URLs y endpoints de Socket.io
 * @readonly
 */
export const SOCKET_ENDPOINTS = {
  /** URL base del servidor Socket.io */
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  /** Namespace para LocalTaste */
  NAMESPACE: '/localtaste',
  /** Endpoint de healthcheck */
  HEALTH: '/socket/health',
};

// Congelar endpoints para prevenir modificaciones
Object.freeze( SOCKET_ENDPOINTS );

// ================================
// MENSAJES Y LOCALIZACIÓN
// ================================

/**
 * Mensajes de estado de conexión
 * @readonly
 */
export const SOCKET_MESSAGES = {
  /** Mensajes de éxito */
  SUCCESS: {
    CONNECTED: 'Conectado al servidor de notificaciones',
    RECONNECTED: 'Reconectado exitosamente',
    JOINED_ROOM: 'Unido a sala de notificaciones',
    LEFT_ROOM: 'Salió de la sala',
  },

  /** Mensajes de error */
  ERROR: {
    CONNECTION_FAILED: 'Error de conexión con el servidor',
    AUTH_FAILED: 'Error de autenticación - Sesión expirada',
    MAX_RECONNECT_REACHED: 'Máximo número de reconexiones alcanzado',
    ROOM_JOIN_FAILED: 'No se pudo unir a la sala',
    INVALID_TOKEN: 'Token de autenticación inválido',
    SERVER_ERROR: 'Error interno del servidor',
  },

  /** Mensajes informativos */
  INFO: {
    DISCONNECTED: 'Desconectado del servidor',
    RECONNECTING: 'Intentando reconectar...',
    CLEANING_UP: 'Limpiando listeners de eventos',
  },
};

// Congelar mensajes para prevenir modificaciones
Object.freeze( SOCKET_MESSAGES.SUCCESS );
Object.freeze( SOCKET_MESSAGES.ERROR );
Object.freeze( SOCKET_MESSAGES.INFO );
Object.freeze( SOCKET_MESSAGES );

// ================================
// CONFIGURACIÓN DE SEGURIDAD
// ================================

/**
 * Configuración de seguridad para Socket.io
 * @readonly
 */
export const SOCKET_SECURITY = {
  /** Configuración de autenticación */
  AUTH: {
    /** Tiempo de vida del token (horas) */
    tokenLifetime: 24,
    /** Verificar token en cada evento crítico */
    verifyOnCriticalEvents: true,
    /** Eventos que requieren verificación adicional */
    criticalEvents: [
      SOCKET_EVENTS.NEW_ORDER,
      SOCKET_EVENTS.CONFIRM_ORDER,
      SOCKET_EVENTS.UPDATE_ORDER_STATUS,
    ],
  },

  /** Configuración de rate limiting */
  RATE_LIMIT: {
    /** Máximo de eventos por minuto por usuario */
    maxEventsPerMinute: 60,
    /** Máximo de conexiones por IP */
    maxConnectionsPerIP: 5,
    /** Tiempo de bloqueo por abuso (minutos) */
    blockDuration: 15,
  },

  /** Headers de seguridad */
  HEADERS: {
    /** Header de autorización */
    authorization: 'Authorization',
    /** Header de user agent */
    userAgent: 'User-Agent',
    /** Header de origen */
    origin: 'Origin',
  },
};

// Congelar configuración de seguridad
Object.freeze( SOCKET_SECURITY.AUTH );
Object.freeze( SOCKET_SECURITY.AUTH.criticalEvents );
Object.freeze( SOCKET_SECURITY.RATE_LIMIT );
Object.freeze( SOCKET_SECURITY.HEADERS );
Object.freeze( SOCKET_SECURITY );

// ================================
// CLASE SOCKET MANAGER
// ================================

/**
 * Gestor de conexiones Socket.io para LocalTaste
 * Implementa patrón Singleton para gestión centralizada
 */
class SocketManager {
  /**
   * Constructor del gestor de Socket.io
   * Inicializa estado interno usando configuración segura
   */
  constructor () {
    /** @type {Socket|null} Instancia del socket */
    this.socket = null;
    /** @type {boolean} Estado de conexión */
    this.isConnected = false;
    /** @type {number} Número de intentos de reconexión */
    this.reconnectAttempts = 0;
    /** @type {number} Máximo intentos de reconexión */
    this.maxReconnectAttempts = SOCKET_CONFIG.RECONNECTION.maxAttempts;
    /** @type {string} Estado actual de conexión */
    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
  }

  /**
   * Inicializa la conexión socket con autenticación segura
   * @returns {Socket|null} Instancia del socket conectado
   */
  connect () {
    // Verificar si ya está conectado
    if ( this.socket?.connected )
    {
      console.log( 'ℹ️ Socket ya conectado:', this.socket.id );
      return this.socket;
    }

    // Obtener token de autenticación de manera segura
    const token = getCookie( SOCKET_CONFIG.SECURITY.authCookie );

    if ( !token )
    {
      console.error( '🔐 No se encontró token de autenticación' );
      return null;
    }

    // Actualizar estado
    this.connectionStatus = CONNECTION_STATUS.CONNECTING;

    // Crear conexión con configuración segura
    this.socket = io( SOCKET_ENDPOINTS.BASE_URL, {
      auth: {
        token: token,
        timestamp: Date.now(), // Para prevenir replay attacks
      },
      autoConnect: SOCKET_CONFIG.CONNECTION.autoConnect,
      reconnection: SOCKET_CONFIG.RECONNECTION.enabled,
      reconnectionDelay: SOCKET_CONFIG.RECONNECTION.delay,
      reconnectionDelayMax: SOCKET_CONFIG.RECONNECTION.delayMax,
      timeout: SOCKET_CONFIG.CONNECTION.timeout,
      forceNew: SOCKET_CONFIG.CONNECTION.forceNew,
      compression: SOCKET_CONFIG.SECURITY.compression,
    } );

    this.setupEventListeners();
    return this.socket;
  }

  /**
   * Configura los listeners básicos de eventos socket
   */
  setupEventListeners () {
    if ( !this.socket ) return;

    // Eventos de conexión usando constantes
    this.socket.on( SOCKET_EVENTS.CONNECT, () => {
      console.log( '✅', SOCKET_MESSAGES.SUCCESS.CONNECTED, this.socket.id );
      this.isConnected = true;
      this.connectionStatus = CONNECTION_STATUS.CONNECTED;
      this.reconnectAttempts = 0;
    } );

    this.socket.on( SOCKET_EVENTS.DISCONNECT, ( reason ) => {
      console.log( '❌', SOCKET_MESSAGES.INFO.DISCONNECTED, reason );
      this.isConnected = false;
      this.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
    } );

    this.socket.on( SOCKET_EVENTS.CONNECT_ERROR, ( error ) => {
      console.error( '🔥', SOCKET_MESSAGES.ERROR.CONNECTION_FAILED, error );
      this.connectionStatus = CONNECTION_STATUS.ERROR;
      this.reconnectAttempts++;

      if ( this.reconnectAttempts >= this.maxReconnectAttempts )
      {
        console.error( '❌', SOCKET_MESSAGES.ERROR.MAX_RECONNECT_REACHED );
        this.disconnect();
      } else
      {
        console.log( '🔄', SOCKET_MESSAGES.INFO.RECONNECTING );
        this.connectionStatus = CONNECTION_STATUS.RECONNECTING;
      }
    } );

    // Eventos de autenticación usando constantes
    this.socket.on( SOCKET_EVENTS.AUTH_ERROR, ( error ) => {
      console.error( '🔐', SOCKET_MESSAGES.ERROR.AUTH_FAILED, error );
      this.connectionStatus = CONNECTION_STATUS.ERROR;
      // Eliminar token inválido y redirigir al login
      removeCookie( SOCKET_CONFIG.SECURITY.authCookie );
      window.location.href = '/login';
    } );
  }

  /**
   * Unirse a sala específica del usuario para notificaciones personalizadas
   * @param {string} userId - ID del usuario
   * @returns {boolean} True si se unió exitosamente
   */
  joinUserRoom ( userId ) {
    if ( this.socket && userId )
    {
      this.socket.emit( SOCKET_EVENTS.JOIN_USER_ROOM, userId );
      console.log( '🏠', SOCKET_MESSAGES.SUCCESS.JOINED_ROOM, 'usuario:', userId );
      return true;
    }
    console.warn( '⚠️ No se pudo unir a sala de usuario - Socket no conectado o userId inválido' );
    return false;
  }

  /**
   * Unirse a sala específica del productor para notificaciones de pedidos
   * @param {string} producerId - ID del productor
   * @returns {boolean} True si se unió exitosamente
   */
  joinProducerRoom ( producerId ) {
    if ( this.socket && producerId )
    {
      this.socket.emit( SOCKET_EVENTS.JOIN_PRODUCER_ROOM, producerId );
      console.log( '🚜', SOCKET_MESSAGES.SUCCESS.JOINED_ROOM, 'productor:', producerId );
      return true;
    }
    console.warn( '⚠️ No se pudo unir a sala de productor - Socket no conectado o producerId inválido' );
    return false;
  }

  /**
   * Salir de sala específica
   * @param {string} roomId - ID de la sala
   * @returns {boolean} True si salió exitosamente
   */
  leaveRoom ( roomId ) {
    if ( this.socket && roomId )
    {
      this.socket.emit( SOCKET_EVENTS.LEAVE_ROOM, roomId );
      console.log( '🚺', SOCKET_MESSAGES.SUCCESS.LEFT_ROOM, roomId );
      return true;
    }
    console.warn( '⚠️ No se pudo salir de la sala - Socket no conectado o roomId inválido' );
    return false;
  }

  /**
   * Suscribirse a nuevos pedidos (para productores)
   * @param {Function} callback - Función callback para el evento
   */
  onNewOrder ( callback ) {
    if ( this.socket )
    {
      this.socket.on( SOCKET_EVENTS.NEW_ORDER, callback );
    }
  }

  /**
   * Suscribirse a actualizaciones de estado de pedidos (para consumidores)
   * @param {Function} callback - Función callback para el evento
   */
  onOrderUpdate ( callback ) {
    if ( this.socket )
    {
      this.socket.on( SOCKET_EVENTS.ORDER_STATUS_UPDATE, callback );
    }
  }

  /**
   * Suscribirse a notificaciones de suscripciones
   * @param {Function} callback - Función callback para el evento
   */
  onSubscriptionUpdate ( callback ) {
    if ( this.socket )
    {
      this.socket.on( SOCKET_EVENTS.SUBSCRIPTION_UPDATE, callback );
    }
  }

  /**
   * Suscribirse a notificaciones generales
   * @param {Function} callback - Función callback para el evento
   */
  onNotification ( callback ) {
    if ( this.socket )
    {
      this.socket.on( SOCKET_EVENTS.NOTIFICATION, callback );
    }
  }

  /**
   * Suscribirse a alertas de stock (para productores)
   * @param {Function} callback - Función callback para el evento
   */
  onStockAlert ( callback ) {
    if ( this.socket )
    {
      this.socket.on( SOCKET_EVENTS.STOCK_ALERT, callback );
    }
  }

  /**
   * Emitir confirmación de pedido (desde productor)
   * @param {string} orderId - ID del pedido a confirmar
   */
  confirmOrder ( orderId ) {
    if ( this.socket )
    {
      this.socket.emit( SOCKET_EVENTS.CONFIRM_ORDER, { orderId } );
    }
  }

  /**
   * Emitir cambio de estado de pedido
   * @param {string} orderId - ID del pedido
   * @param {string} status - Nuevo estado del pedido
   */
  updateOrderStatus ( orderId, status ) {
    if ( this.socket )
    {
      this.socket.emit( SOCKET_EVENTS.UPDATE_ORDER_STATUS, { orderId, status } );
    }
  }

  /**
   * Marcar notificación como leída
   * @param {string} notificationId - ID de la notificación
   */
  markNotificationRead ( notificationId ) {
    if ( this.socket )
    {
      this.socket.emit( SOCKET_EVENTS.MARK_NOTIFICATION_READ, { notificationId } );
    }
  }

  /**
   * Eliminar todos los listeners de un evento específico
   * @param {string} eventName - Nombre del evento
   */
  removeListener ( eventName ) {
    if ( this.socket )
    {
      this.socket.off( eventName );
    }
  }

  /**
   * Eliminar todos los listeners
   */
  removeAllListeners () {
    if ( this.socket )
    {
      this.socket.removeAllListeners();
    }
  }

  /**
   * Desconectar socket
   */
  disconnect () {
    if ( this.socket )
    {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log( '🔌 Socket desconectado manualmente' );
    }
  }

  /**
   * Obtener estado de la conexión
   * @returns {Object} Estado actual del socket
   */
  getConnectionStatus () {
    return {
      connected: this.isConnected,
      connectionStatus: this.connectionStatus,
      socketId: this.socket?.id || null,
      reconnectAttempts: this.reconnectAttempts
    };
  }
}

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Verificar si un evento es crítico y requiere autenticación adicional
 * @param {string} eventName - Nombre del evento
 * @returns {boolean} True si el evento es crítico
 */
export const isCriticalEvent = ( eventName ) => {
  return SOCKET_SECURITY.AUTH.criticalEvents.includes( eventName );
};

/**
 * Validar estructura de notificación
 * @param {Object} notification - Objeto de notificación
 * @returns {Object} Resultado de validación
 */
export const validateNotification = ( notification ) => {
  const errors = [];

  if ( !notification.type || !Object.values( NOTIFICATION_TYPES ).includes( notification.type ) )
  {
    errors.push( 'Tipo de notificación inválido' );
  }

  if ( !notification.title || typeof notification.title !== 'string' )
  {
    errors.push( 'Título de notificación requerido' );
  }

  if ( !notification.message || typeof notification.message !== 'string' )
  {
    errors.push( 'Mensaje de notificación requerido' );
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generar ID de sala basado en tipo y ID de usuario
 * @param {string} roomType - Tipo de sala
 * @param {string} userId - ID del usuario
 * @returns {string} ID de sala formateado
 */
export const generateRoomId = ( roomType, userId ) => {
  if ( !Object.values( ROOM_TYPES ).includes( roomType ) )
  {
    throw new Error( `Tipo de sala inválido: ${ roomType }` );
  }

  if ( !userId || typeof userId !== 'string' )
  {
    throw new Error( 'ID de usuario requerido' );
  }

  return `${ roomType }_${ userId }`;
};

/**
 * Verificar si el socket está en estado saludable
 * @param {SocketManager} socketInstance - Instancia del socket manager
 * @returns {Object} Estado de salud del socket
 */
export const getSocketHealth = ( socketInstance ) => {
  const health = {
    connected: socketInstance.isConnected,
    status: socketInstance.connectionStatus,
    reconnectAttempts: socketInstance.reconnectAttempts,
    maxReconnectAttempts: socketInstance.maxReconnectAttempts,
    healthy: false,
    issues: []
  };

  // Verificar conexión
  if ( !health.connected )
  {
    health.issues.push( 'Socket no conectado' );
  }

  // Verificar intentos de reconexión
  if ( health.reconnectAttempts > 0 )
  {
    health.issues.push( `${ health.reconnectAttempts } intentos de reconexión` );
  }

  // Verificar si está cerca del límite
  if ( health.reconnectAttempts >= health.maxReconnectAttempts - 1 )
  {
    health.issues.push( 'Cerca del límite de reconexiones' );
  }

  // Determinar si está saludable
  health.healthy = health.connected && health.issues.length === 0;

  return health;
};

/**
 * Formatear evento de notificación para LocalTaste
 * @param {string} type - Tipo de notificación
 * @param {Object} data - Datos de la notificación
 * @returns {Object} Notificación formateada
 */
export const formatNotification = ( type, data ) => {
  if ( !Object.values( NOTIFICATION_TYPES ).includes( type ) )
  {
    throw new Error( `Tipo de notificación inválido: ${ type }` );
  }

  const notification = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    type,
    timestamp: new Date().toISOString(),
    read: false,
    ...data
  };

  // Validar la notificación formateada
  const validation = validateNotification( notification );
  if ( !validation.isValid )
  {
    throw new Error( `Notificación inválida: ${ validation.errors.join( ', ' ) }` );
  }

  return notification;
};

/**
 * Obtener configuración de conexión para entorno actual
 * @param {string} environment - Entorno (development, production, test)
 * @returns {Object} Configuración específica del entorno
 */
export const getEnvironmentConfig = ( environment = 'development' ) => {
  const baseConfig = { ...SOCKET_CONFIG };

  switch ( environment )
  {
    case 'production':
      return {
        ...baseConfig,
        CONNECTION: {
          ...baseConfig.CONNECTION,
          timeout: 30000, // Timeout mayor en producción
        },
        SECURITY: {
          ...baseConfig.SECURITY,
          rejectUnauthorized: true, // Estricto en producción
        }
      };

    case 'test':
      return {
        ...baseConfig,
        RECONNECTION: {
          ...baseConfig.RECONNECTION,
          maxAttempts: 2, // Menos intentos en testing
          delay: 100, // Reconexión más rápida para tests
        }
      };

    default: // development
      return baseConfig;
  }
};

/**
 * Limpiar listeners de eventos de manera segura
 * @param {Socket} socket - Instancia del socket
 * @param {Array<string>} events - Lista de eventos a limpiar
 */
export const cleanupSocketListeners = ( socket, events = [] ) => {
  if ( !socket )
  {
    console.warn( '⚠️ No se puede limpiar listeners - Socket no válido' );
    return;
  }

  console.log( '🧹', SOCKET_MESSAGES.INFO.CLEANING_UP );

  if ( events.length === 0 )
  {
    // Limpiar todos los listeners
    socket.removeAllListeners();
    console.log( '✅ Todos los listeners removidos' );
  } else
  {
    // Limpiar listeners específicos
    events.forEach( event => {
      socket.removeAllListeners( event );
      console.log( `✅ Listeners removidos para evento: ${ event }` );
    } );
  }
};

/**
 * Auditar configuración de Socket.io para detectar problemas de seguridad
 * @param {Object} config - Configuración a auditar
 * @returns {Object} Reporte de auditoría
 */
export const auditSocketSecurity = ( config = SOCKET_CONFIG ) => {
  const report = {
    issues: [],
    warnings: [],
    recommendations: [],
    score: 100
  };

  // Verificar configuración de reconexión
  if ( config.RECONNECTION.maxAttempts > 10 )
  {
    report.warnings.push( 'Demasiados intentos de reconexión pueden causar spam' );
    report.score -= 5;
  }

  // Verificar timeout
  if ( config.CONNECTION.timeout < 10000 )
  {
    report.warnings.push( 'Timeout muy bajo puede causar desconexiones frecuentes' );
    report.score -= 5;
  }

  // Verificar configuración de seguridad
  if ( !config.SECURITY.rejectUnauthorized )
  {
    report.issues.push( 'Certificados SSL no están siendo validados' );
    report.score -= 20;
  }

  // Recomendaciones
  if ( config.CONNECTION.timeout === 20000 )
  {
    report.recommendations.push( 'Considerar aumentar timeout en producción' );
  }

  return report;
};

// ================================
// INSTANCIA SINGLETON
// ================================

// Crear instancia singleton
const socketManager = new SocketManager();

export default socketManager;

// Exportar métodos individuales para comodidad
export const {
  connect,
  disconnect,
  joinUserRoom,
  joinProducerRoom,
  leaveRoom,
  onNewOrder,
  onOrderUpdate,
  onSubscriptionUpdate,
  onNotification,
  onStockAlert,
  confirmOrder,
  updateOrderStatus,
  markNotificationRead,
  removeListener,
  removeAllListeners,
  getConnectionStatus
} = socketManager;

// manejo de errores
export const ERROR_TYPES = Object.freeze( {
  NETWORK: 'network',
  AUTH: 'authentication',
  PERMISSION: 'permission',
  VALIDATION: 'validation'
} );
