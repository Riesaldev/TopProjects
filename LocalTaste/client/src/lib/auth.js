/**
 * @fileoverview Constantes y configuración de autenticación para la aplicación LocalTaste
 * Proporciona constantes de autenticación centralizadas para usuarios, productores y administradores
 */

// ================================
// ROLES DE USUARIO Y PERMISOS
// ================================

/**
 * Roles de usuario disponibles en el sistema
 * @readonly
 * @enum {string}
 */
export const USER_ROLES = {
  /** Usuario consumidor estándar */
  USER: 'user',
  /** Productor/vendedor local */
  PRODUCER: 'producer',
  /** Administrador del sistema */
  ADMIN: 'admin',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( USER_ROLES );

/**
 * Permisos específicos de LocalTaste - Marketplace de productos locales
 * @readonly
 */
export const PERMISSIONS = {
  // === PERMISOS BÁSICOS (TODOS LOS ROLES) ===
  VIEW_PRODUCTS: 'view_products',              // Ver catálogo de productos
  MANAGE_PROFILE: 'manage_profile',           // Gestionar perfil personal
  SEARCH_PRODUCTS: 'search_products',         // Buscar productos por filtros
  VIEW_PRODUCER_PROFILES: 'view_producer_profiles', // Ver perfiles de productores

  // === PERMISOS DE CONSUMIDOR ===
  // Compras y carrito
  ADD_TO_CART: 'add_to_cart',                // Añadir productos al carrito
  MANAGE_CART: 'manage_cart',                // Gestionar carrito de compra
  CHECKOUT: 'checkout',                      // Realizar proceso de compra
  MAKE_PAYMENTS: 'make_payments',            // Realizar pagos con Stripe

  // Pedidos y suscripciones
  VIEW_ORDERS: 'view_orders',                // Ver historial de pedidos
  TRACK_ORDERS: 'track_orders',              // Seguimiento de entregas
  CREATE_SUBSCRIPTIONS: 'create_subscriptions', // Crear cestas personalizadas recurrentes
  MANAGE_SUBSCRIPTIONS: 'manage_subscriptions', // Gestionar suscripciones activas
  PAUSE_SUBSCRIPTIONS: 'pause_subscriptions',   // Pausar/reanudar suscripciones

  // Interacción social
  RATE_PRODUCTS: 'rate_products',            // Valorar productos (1-5 estrellas)
  WRITE_REVIEWS: 'write_reviews',            // Escribir reseñas de productos
  FAVORITE_PRODUCERS: 'favorite_producers',   // Marcar productores favoritos

  // === PERMISOS DE PRODUCTOR ===
  // Gestión de productos
  CREATE_PRODUCTS: 'create_products',         // Crear nuevos productos
  EDIT_OWN_PRODUCTS: 'edit_own_products',    // Editar productos propios
  DELETE_OWN_PRODUCTS: 'delete_own_products', // Eliminar productos propios
  MANAGE_STOCK: 'manage_stock',              // Gestionar inventario y stock
  SET_PRICES: 'set_prices',                  // Establecer precios

  // Dashboard de productor
  VIEW_SALES_DASHBOARD: 'view_sales_dashboard', // Ver dashboard de ventas
  VIEW_SALES_ANALYTICS: 'view_sales_analytics', // Analíticas de ventas
  EXPORT_SALES_REPORTS: 'export_sales_reports', // Exportar reportes

  // Gestión de pedidos
  VIEW_RECEIVED_ORDERS: 'view_received_orders', // Ver pedidos recibidos
  UPDATE_ORDER_STATUS: 'update_order_status',   // Actualizar estado de pedidos
  CONFIRM_DELIVERIES: 'confirm_deliveries',     // Confirmar entregas

  // Perfil de productor
  MANAGE_PRODUCER_PROFILE: 'manage_producer_profile', // Gestión perfil de productor
  UPLOAD_CERTIFICATIONS: 'upload_certifications',     // Subir certificaciones
  SET_DELIVERY_ZONES: 'set_delivery_zones',           // Configurar zonas de entrega

  // === PERMISOS DE ADMINISTRADOR ===
  // Gestión de usuarios consumidores
  MANAGE_ALL_CONSUMERS: 'manage_all_consumers',     // Gestionar usuarios consumidores
  BAN_CONSUMERS: 'ban_consumers',                   // Suspender/bannear consumidores
  VIEW_CONSUMER_ANALYTICS: 'view_consumer_analytics', // Ver analíticas de consumidores

  // Gestión de productores
  MANAGE_ALL_PRODUCERS: 'manage_all_producers',     // Gestionar todos los productores
  APPROVE_PRODUCERS: 'approve_producers',           // Aprobar/rechazar solicitudes de productores
  BAN_PRODUCERS: 'ban_producers',                   // Suspender/bannear productores
  VIEW_PRODUCER_ANALYTICS: 'view_producer_analytics', // Ver analíticas de productores
  VERIFY_PRODUCER_BUSINESS: 'verify_producer_business', // Verificar datos de negocio

  // Gestión global de usuarios (consumidores + productores)
  MANAGE_ALL_USERS: 'manage_all_users',             // Gestionar TODOS los tipos de usuarios
  VIEW_ALL_USER_ANALYTICS: 'view_all_user_analytics', // Ver analíticas globales de usuarios

  // Gestión global de productos
  MANAGE_ALL_PRODUCTS: 'manage_all_products', // Gestionar todos los productos
  MODERATE_REVIEWS: 'moderate_reviews',       // Moderar reseñas reportadas
  FEATURE_PRODUCTS: 'feature_products',       // Destacar productos en home

  // Administración del sistema
  SYSTEM_CONFIGURATION: 'system_configuration', // Configuración general
  VIEW_GLOBAL_ANALYTICS: 'view_global_analytics', // Analíticas globales
  MANAGE_CATEGORIES: 'manage_categories',      // Gestionar categorías de productos
  MANAGE_DELIVERY_ZONES: 'manage_delivery_zones', // Gestionar zonas de entrega
  ACCESS_ADMIN_PANEL: 'access_admin_panel',    // Acceso al panel de administración

  // Soporte y moderación
  ACCESS_SUPPORT_TICKETS: 'access_support_tickets', // Gestionar tickets de soporte
  MODERATE_PLATFORM: 'moderate_platform',           // Moderación general
};

// Congelar objeto para prevenir modificaciones
Object.freeze( PERMISSIONS );

/**
 * Asignación de permisos por rol en LocalTaste
 * Cada rol tiene funcionalidades específicas según las historias de usuario
 */
export const ROLE_PERMISSIONS = {
  [ USER_ROLES.USER ]: [
    // Funcionalidades básicas
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.MANAGE_PROFILE,
    PERMISSIONS.SEARCH_PRODUCTS,
    PERMISSIONS.VIEW_PRODUCER_PROFILES,

    // HU01: Explorar productos locales
    PERMISSIONS.ADD_TO_CART,
    PERMISSIONS.MANAGE_CART,
    PERMISSIONS.CHECKOUT,
    PERMISSIONS.MAKE_PAYMENTS,

    // HU02: Suscripciones a cestas personalizadas  
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.TRACK_ORDERS,
    PERMISSIONS.CREATE_SUBSCRIPTIONS,
    PERMISSIONS.MANAGE_SUBSCRIPTIONS,
    PERMISSIONS.PAUSE_SUBSCRIPTIONS,

    // HU03: Valorar productos y productores
    PERMISSIONS.RATE_PRODUCTS,
    PERMISSIONS.WRITE_REVIEWS,
    PERMISSIONS.FAVORITE_PRODUCERS,
  ],

  [ USER_ROLES.PRODUCER ]: [
    // Funcionalidades básicas
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.MANAGE_PROFILE,
    PERMISSIONS.SEARCH_PRODUCTS,
    PERMISSIONS.VIEW_PRODUCER_PROFILES,

    // HU04: Gestionar inventario
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_OWN_PRODUCTS,
    PERMISSIONS.DELETE_OWN_PRODUCTS,
    PERMISSIONS.MANAGE_STOCK,
    PERMISSIONS.SET_PRICES,

    // HU05: Dashboard y analíticas
    PERMISSIONS.VIEW_SALES_DASHBOARD,
    PERMISSIONS.VIEW_SALES_ANALYTICS,
    PERMISSIONS.EXPORT_SALES_REPORTS,

    // HU05: Gestión de pedidos y notificaciones
    PERMISSIONS.VIEW_RECEIVED_ORDERS,
    PERMISSIONS.UPDATE_ORDER_STATUS,
    PERMISSIONS.CONFIRM_DELIVERIES,

    // Perfil especializado de productor
    PERMISSIONS.MANAGE_PRODUCER_PROFILE,
    PERMISSIONS.UPLOAD_CERTIFICATIONS,
    PERMISSIONS.SET_DELIVERY_ZONES,
  ],

  [ USER_ROLES.ADMIN ]: [
    // HU06: Supervisar marketplace - Admin tiene TODOS los permisos
    ...Object.values( PERMISSIONS ),
  ],
};

// Congelar objeto para prevenir modificaciones
Object.freeze( ROLE_PERMISSIONS );

// ================================
// ALMACENAMIENTO Y COOKIES
// ================================

/**
 * Configuración SEGURA de almacenamiento de autenticación para LocalTaste
 * Implementa mejores prácticas de seguridad para proteger datos sensibles
 */
export const AUTH_STORAGE = {
  // === COOKIES SEGURAS (HTTPOnly, Secure, SameSite) ===
  // Almacenamiento PRINCIPAL para tokens (más seguro)
  COOKIES: {
    /** Cookie HTTPOnly para JWT token principal - NO accesible desde JavaScript */
    AUTH_TOKEN: 'localtaste_auth_secure',
    /** Cookie HTTPOnly para refresh token - MÁS SEGURO */
    REFRESH_TOKEN: 'localtaste_refresh_secure',
    /** Configuración de seguridad para cookies */
    CONFIG: {
      httpOnly: true,        // NO accesible desde JavaScript
      secure: true,          // Solo HTTPS en producción
      sameSite: 'strict',    // Protección CSRF
      expires: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
    }
  },

  // === LOCALSTORAGE (solo datos NO sensibles) ===
  // NUNCA almacenar tokens JWT aquí - vulnerable a XSS
  LOCAL_STORAGE: {
    /** Información básica y NO sensible del usuario */
    USER_PREFERENCES: 'localtaste_user_preferences', // Tema, idioma, etc.
    /** Carrito de compra temporal */
    SHOPPING_CART: 'localtaste_cart',
    /** Productos favoritos */
    FAVORITES: 'localtaste_favorites',
    /** Historial de búsquedas (NO sensitivo) */
    SEARCH_HISTORY: 'localtaste_search_history',
  },

  // === SESSION STORAGE (datos de sesión temporal) ===
  SESSION_STORAGE: {
    /** Estado temporal de formularios */
    FORM_STATE: 'localtaste_form_state',
    /** Datos temporales de checkout */
    CHECKOUT_STATE: 'localtaste_checkout_temp',
  },

  // === DATOS PERMITIDOS EN CADA STORAGE ===
  ALLOWED_DATA: {
    // Lo que NUNCA debe ir en LocalStorage
    FORBIDDEN_IN_LOCALSTORAGE: [
      'password',
      'jwt_token',
      'refresh_token',
      'credit_card',
      'tax_id',
      'phone_number',
      'full_address',
      'email', // Solo ID público si es necesario
    ],

    // Lo que es SEGURO en LocalStorage
    SAFE_IN_LOCALSTORAGE: [
      'user_id', // Solo ID público
      'display_name', // Nombre público
      'role', // Rol del usuario
      'theme_preference',
      'language',
      'notification_preferences',
      'cart_items',
      'favorite_products',
    ],
  },
};

// Congelar configuración de seguridad
Object.freeze( AUTH_STORAGE.COOKIES.CONFIG );
Object.freeze( AUTH_STORAGE.ALLOWED_DATA.FORBIDDEN_IN_LOCALSTORAGE );
Object.freeze( AUTH_STORAGE.ALLOWED_DATA.SAFE_IN_LOCALSTORAGE );
Object.freeze( AUTH_STORAGE );

// ================================
// CONFIGURACIÓN DE API
// ================================

/**
 * URL base de la API de autenticación
 */
export const AUTH_API_BASE_URL = '/api/auth';

/**
 * Endpoints de la API de autenticación
 * @readonly
 */
export const AUTH_ENDPOINTS = {
  // Autenticación básica
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  REFRESH_TOKEN: '/refresh-token',
  VERIFY_TOKEN: '/verify-token',

  // Recuperación de contraseña
  PASSWORD_RESET: {
    REQUEST: '/password-reset/request',
    CONFIRM: '/password-reset/confirm',
    VERIFY: '/password-reset/verify',
  },

  // Verificación de email
  EMAIL_VERIFICATION: {
    REQUEST: '/email-verification/request',
    CONFIRM: '/email-verification/confirm',
    RESEND: '/email-verification/resend',
  },

  // Gestión de perfil
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile/update',
    DELETE: '/profile/delete',
    UPLOAD_AVATAR: '/profile/avatar',
  },

  // Específico para productores
  PRODUCER: {
    REGISTER: '/producer/register',
    VERIFY_BUSINESS: '/producer/verify-business',
    UPDATE_BUSINESS_INFO: '/producer/business-info',
    UPLOAD_CERTIFICATIONS: '/producer/certifications',
  },

  // Gestión de roles y permisos
  ROLES: {
    CHECK_PERMISSIONS: '/roles/check-permissions',
    REQUEST_PRODUCER_ROLE: '/roles/request-producer',
    APPROVE_PRODUCER_ROLE: '/roles/approve-producer', // Solo admin
  },
};

// Congelar objetos anidados para prevenir modificaciones
Object.freeze( AUTH_ENDPOINTS.PASSWORD_RESET );
Object.freeze( AUTH_ENDPOINTS.EMAIL_VERIFICATION );
Object.freeze( AUTH_ENDPOINTS.PROFILE );
Object.freeze( AUTH_ENDPOINTS );

// ================================
// CONFIGURACIÓN DE SEGURIDAD
// ================================

/**
 * Configuración de seguridad y validación
 */
export const AUTH_SECURITY = {
  /** Expiración de token de restablecimiento de contraseña (horas) */
  PASSWORD_RESET_EXPIRY_HOURS: 1,
  /** Expiración de token de verificación de email (horas) */
  EMAIL_VERIFICATION_EXPIRY_HOURS: 24,
  /** Expiración de token JWT (horas) */
  JWT_EXPIRY_HOURS: 24,
  /** Expiración de token de refresco (días) */
  REFRESH_TOKEN_EXPIRY_DAYS: 30,
  /** Máximo número de intentos de inicio de sesión fallidos */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Ventana de intentos de inicio de sesión (minutos) */
  LOGIN_ATTEMPT_WINDOW_MINUTES: 15,
  /** Duración de bloqueo de cuenta (minutos) */
  ACCOUNT_LOCKOUT_MINUTES: 30,
};

// Congelar objeto para prevenir modificaciones
Object.freeze( AUTH_SECURITY );

// ================================
// CONFIGURACIÓN HTTP
// ================================

/**
 * Cabeceras HTTP utilizadas en solicitudes de autenticación
 */
export const AUTH_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  CSRF_TOKEN: 'X-CSRF-Token',
  REQUEST_ID: 'X-Request-ID',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( AUTH_HEADERS );

/**
 * Tipos de contenido para solicitudes de autenticación
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  MULTIPART_FORM: 'multipart/form-data',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( CONTENT_TYPES );

/**
 * Prefijo de token de autenticación
 */
export const TOKEN_PREFIX = 'Bearer ';

// ================================
// MENSAJES Y LOCALIZACIÓN
// ================================

/**
 * Mensajes de error de autenticación
 * @readonly
 */
export const AUTH_ERRORS = {
  // Errores de autenticación
  INVALID_CREDENTIALS: 'Credenciales inválidas. Verifica tu email y contraseña.',
  ACCOUNT_LOCKED: 'Tu cuenta ha sido bloqueada por múltiples intentos fallidos. Intenta más tarde.',
  TOKEN_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  TOKEN_INVALID: 'Token de autenticación inválido.',

  // Errores de estado de cuenta
  UNVERIFIED_EMAIL: 'Por favor, verifica tu dirección de email para continuar.',
  ACCOUNT_DISABLED: 'Tu cuenta ha sido deshabilitada. Contacta al soporte.',
  ACCOUNT_SUSPENDED: 'Tu cuenta ha sido suspendida temporalmente.',

  // Errores de permisos
  INSUFFICIENT_PERMISSIONS: 'No tienes permisos para acceder a este recurso.',
  UNAUTHORIZED_ACCESS: 'Acceso no autorizado.',
  FORBIDDEN_ACTION: 'Acción no permitida para tu rol de usuario.',

  // Errores de red
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  SERVICE_UNAVAILABLE: 'Servicio temporalmente no disponible.',

  // Errores de validación
  INVALID_EMAIL_FORMAT: 'Formato de email inválido.',
  PASSWORD_TOO_WEAK: 'La contraseña debe tener al menos 8 caracteres.',
  EMAIL_ALREADY_EXISTS: 'Este email ya está registrado.',

  // Genérico
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( AUTH_ERRORS );

/**
 * Mensajes de éxito de autenticación
 * @readonly
 */
export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: 'Sesión iniciada correctamente.',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente.',
  REGISTER_SUCCESS: 'Cuenta creada exitosamente.',

  PASSWORD_RESET_SENT: 'Se ha enviado un enlace de recuperación a tu email.',
  PASSWORD_RESET_SUCCESS: 'Tu contraseña ha sido actualizada exitosamente.',

  EMAIL_VERIFICATION_SENT: 'Se ha enviado un enlace de verificación a tu email.',
  EMAIL_VERIFICATION_SUCCESS: 'Tu email ha sido verificado exitosamente.',

  PROFILE_UPDATED: 'Perfil actualizado correctamente.',
  ACCOUNT_DELETED: 'Cuenta eliminada exitosamente.',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( AUTH_SUCCESS );

// ================================
// EVENTOS
// ================================

/**
 * Eventos de autenticación para event listeners
 * @readonly
 */
export const AUTH_EVENTS = {
  // === EVENTOS DE AUTENTICACIÓN BÁSICA ===
  LOGIN_SUCCESS: 'auth:login:success',
  LOGIN_FAILURE: 'auth:login:failure',
  LOGOUT: 'auth:logout',
  REGISTER_SUCCESS: 'auth:register:success',

  // === EVENTOS DE TOKEN Y SESIÓN ===
  TOKEN_REFRESH: 'auth:token:refresh',
  TOKEN_EXPIRED: 'auth:token:expired',
  TOKEN_INVALID: 'auth:token:invalid',
  SESSION_EXPIRED: 'auth:session:expired',
  SESSION_RESTORED: 'auth:session:restored',

  // === EVENTOS DE CUENTA ===
  EMAIL_VERIFIED: 'auth:email:verified',
  PASSWORD_RESET: 'auth:password:reset',
  ACCOUNT_LOCKED: 'auth:account:locked',
  PROFILE_UPDATED: 'auth:profile:updated',

  // === EVENTOS ESPECÍFICOS DE LOCALTASTE ===
  // Rol de productor
  PRODUCER_ROLE_REQUESTED: 'auth:producer:role-requested',
  PRODUCER_ROLE_APPROVED: 'auth:producer:role-approved',
  PRODUCER_ROLE_REJECTED: 'auth:producer:role-rejected',
  BUSINESS_VERIFIED: 'auth:producer:business-verified',

  // Permisos y accesos
  PERMISSION_GRANTED: 'auth:permission:granted',
  PERMISSION_REVOKED: 'auth:permission:revoked',
  ROLE_CHANGED: 'auth:role:changed',

  // Eventos para Socket.io (notificaciones en tiempo real)
  USER_CONNECTED: 'auth:user:connected',
  USER_DISCONNECTED: 'auth:user:disconnected',
  ADMIN_NOTIFICATION: 'auth:admin:notification', // Para moderación
};

// Congelar objeto para prevenir modificaciones
Object.freeze( AUTH_EVENTS );

// ================================
// PATRONES DE VALIDACIÓN
// ================================

/**
 * Expresiones regulares para validación
 */
export const VALIDATION_PATTERNS = {
  // Validaciones básicas
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,

  // Validaciones específicas de LocalTaste
  BUSINESS_NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.,&-]{3,100}$/,
  TAX_ID: /^[A-Z0-9]{5,20}$/, // NIF, CIF, etc.
  POSTAL_CODE: /^\d{5}$/,
  ADDRESS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.,#-]{5,200}$/,

  // Validaciones de productos
  PRODUCT_NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.,()-]{2,100}$/,
  PRICE: /^\d+(\.\d{1,2})?$/,
  WEIGHT: /^\d+(\.\d{1,3})?$/,

  // Validaciones de texto libre (reseñas, descripciones)
  REVIEW_TEXT: /^[\s\S]{10,1000}$/, // 10-1000 caracteres, cualquier carácter
  DESCRIPTION: /^[\s\S]{20,2000}$/, // 20-2000 caracteres
};

/**
 * Mensajes de error de validación específicos
 */
export const VALIDATION_ERRORS = {
  EMAIL: 'Por favor, introduce un email válido',
  PASSWORD: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos',
  PHONE: 'Introduce un número de teléfono válido',
  NAME: 'El nombre debe tener entre 2 y 50 caracteres',
  BUSINESS_NAME: 'El nombre del negocio debe tener entre 3 y 100 caracteres',
  TAX_ID: 'Introduce un CIF/NIF válido',
  POSTAL_CODE: 'Introduce un código postal válido (5 dígitos)',
  ADDRESS: 'Introduce una dirección válida',
  PRODUCT_NAME: 'El nombre del producto debe tener entre 2 y 100 caracteres',
  PRICE: 'Introduce un precio válido (ej: 10.50)',
  WEIGHT: 'Introduce un peso válido (ej: 1.5)',
  REVIEW_TEXT: 'La reseña debe tener entre 10 y 1000 caracteres',
  DESCRIPTION: 'La descripción debe tener entre 20 y 2000 caracteres',
};

// Congelar objetos de validación
Object.freeze( VALIDATION_ERRORS );

// Congelar objeto para prevenir modificaciones
Object.freeze( VALIDATION_PATTERNS );

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Verificar si un usuario tiene un permiso específico
 * @param {string} userRole - Rol actual del usuario
 * @param {string} permission - Permiso requerido
 * @returns {boolean} True si el usuario tiene el permiso
 */
export const hasPermission = ( userRole, permission ) => {
  const rolePermissions = ROLE_PERMISSIONS[ userRole ];
  return rolePermissions ? rolePermissions.includes( permission ) : false;
};

/**
 * Verificar si un usuario puede acceder a una funcionalidad de otro rol
 * Solo para casos específicos donde haya overlap
 * @param {string} userRole - Rol actual del usuario
 * @param {string} targetRole - Rol objetivo a verificar
 * @returns {boolean} True si puede acceder
 */
export const canAccessRoleFeature = ( userRole, targetRole ) => {
  // Solo admin puede acceder a funcionalidades de otros roles
  if ( userRole === USER_ROLES.ADMIN ) return true;

  // Los usuarios solo pueden acceder a sus propias funcionalidades
  return userRole === targetRole;
};

/**
 * Obtener URL completa del endpoint de API
 * @param {string} endpoint - Ruta del endpoint
 * @returns {string} URL completa de la API
 */
export const getApiUrl = ( endpoint ) => {
  return `${ AUTH_API_BASE_URL }${ endpoint }`;
};

/**
 * Formatear valor de cabecera de autorización
 * @param {string} token - Token JWT
 * @returns {string} Cabecera de autorización formateada
 */
export const formatAuthHeader = ( token ) => {
  return `${ TOKEN_PREFIX }${ token }`;
};

/**
 * Verificar si el usuario puede realizar una acción específica en LocalTaste
 * @param {string} userRole - Rol del usuario
 * @param {string} action - Acción a verificar
 * @param {Object} context - Contexto adicional (ej: si es el propietario del recurso)
 * @returns {boolean} True si puede realizar la acción
 */
export const canPerformAction = ( userRole, action, context = {} ) => {
  // Verificar permiso básico
  if ( !hasPermission( userRole, action ) ) return false;

  // Lógica específica para algunas acciones
  switch ( action )
  {
    case PERMISSIONS.EDIT_OWN_PRODUCTS:
    case PERMISSIONS.DELETE_OWN_PRODUCTS:
      // Solo puede editar/eliminar sus propios productos
      return context.isOwner === true;

    case PERMISSIONS.VIEW_RECEIVED_ORDERS:
      // Solo puede ver pedidos dirigidos a él
      return context.isProducerOfOrder === true;

    case PERMISSIONS.WRITE_REVIEWS:
      // Solo puede escribir reseñas de productos que ha comprado
      return context.hasPurchased === true;

    default:
      return true;
  }
};

/**
 * Obtener URL de redirección según el rol del usuario
 * @param {string} userRole - Rol del usuario
 * @returns {string} URL de redirección después del login
 */
export const getRedirectUrl = ( userRole ) => {
  switch ( userRole )
  {
    case USER_ROLES.USER:
      return '/'; // Página principal con catálogo
    case USER_ROLES.PRODUCER:
      return '/dashboard/producer'; // Dashboard del productor
    case USER_ROLES.ADMIN:
      return '/admin'; // Panel de administración
    default:
      return '/';
  }
};

/**
 * Validar datos de registro según el rol
 * @param {Object} data - Datos a validar
 * @param {string} role - Rol para el que se registra
 * @returns {Object} Resultado de validación
 */
export const validateRegistrationData = ( data, role ) => {
  const errors = {};

  // Validaciones comunes
  if ( !VALIDATION_PATTERNS.EMAIL.test( data.email ) )
  {
    errors.email = VALIDATION_ERRORS.EMAIL;
  }

  if ( !VALIDATION_PATTERNS.PASSWORD.test( data.password ) )
  {
    errors.password = VALIDATION_ERRORS.PASSWORD;
  }

  if ( !VALIDATION_PATTERNS.NAME.test( data.name ) )
  {
    errors.name = VALIDATION_ERRORS.NAME;
  }

  // Validaciones específicas para productores
  if ( role === USER_ROLES.PRODUCER )
  {
    if ( !VALIDATION_PATTERNS.BUSINESS_NAME.test( data.businessName ) )
    {
      errors.businessName = VALIDATION_ERRORS.BUSINESS_NAME;
    }

    if ( !VALIDATION_PATTERNS.TAX_ID.test( data.taxId ) )
    {
      errors.taxId = VALIDATION_ERRORS.TAX_ID;
    }

    if ( !VALIDATION_PATTERNS.ADDRESS.test( data.address ) )
    {
      errors.address = VALIDATION_ERRORS.ADDRESS;
    }
  }

  return {
    isValid: Object.keys( errors ).length === 0,
    errors
  };
};
// ================================
// FUNCIONES DE ALMACENAMIENTO SEGURO
// ================================

/**
 * Verificar si un dato es seguro para almacenar en LocalStorage
 * @param {string} dataKey - Clave del dato a verificar
 * @returns {boolean} True si es seguro almacenar
 */
export const isSafeForLocalStorage = ( dataKey ) => {
  const forbidden = AUTH_STORAGE.ALLOWED_DATA.FORBIDDEN_IN_LOCALSTORAGE;
  const safe = AUTH_STORAGE.ALLOWED_DATA.SAFE_IN_LOCALSTORAGE;

  // Si está explícitamente prohibido
  if ( forbidden.includes( dataKey ) ) return false;

  // Si está explícitamente permitido
  if ( safe.includes( dataKey ) ) return true;

  // Por defecto, NO es seguro (principio de menor privilegio)
  return false;
};

/**
 * Almacenar datos de manera segura según su tipo
 * @param {string} key - Clave del dato
 * @param {any} value - Valor a almacenar
 * @param {Object} options - Opciones de almacenamiento
 */
export const secureStore = ( key, value, options = {} ) => {
  const { storage = 'auto', encrypt = false } = options;

  // Determinar el storage más seguro automáticamente
  if ( storage === 'auto' )
  {
    // Si contiene información sensible, mostrar advertencia
    if ( !isSafeForLocalStorage( key ) )
    {
      console.warn( `⚠️ SEGURIDAD: "${ key }" contiene datos sensibles. No se almacenará en LocalStorage.` );
      return false;
    }
  }

  try
  {
    switch ( storage )
    {
      case 'localStorage':
        if ( isSafeForLocalStorage( key ) )
        {
          localStorage.setItem( key, JSON.stringify( value ) );
          return true;
        }
        console.error( `🔒 SEGURIDAD: "${ key }" no es seguro para LocalStorage` );
        return false;

      case 'sessionStorage':
        sessionStorage.setItem( key, JSON.stringify( value ) );
        return true;

      case 'auto':
        // Usar LocalStorage solo si es seguro
        if ( isSafeForLocalStorage( key ) )
        {
          localStorage.setItem( key, JSON.stringify( value ) );
          return true;
        }
        // Fallback a sessionStorage para datos menos sensibles
        sessionStorage.setItem( key, JSON.stringify( value ) );
        return true;

      default:
        console.error( `Storage type "${ storage }" not supported` );
        return false;
    }
  } catch ( error )
  {
    console.error( 'Error storing data:', error );
    return false;
  }
};

/**
 * Recuperar datos de manera segura
 * @param {string} key - Clave del dato
 * @param {Object} options - Opciones de recuperación
 * @returns {any} Valor recuperado o null
 */
export const secureRetrieve = ( key, options = {} ) => {
  const { storage = 'auto', defaultValue = null } = options;

  try
  {
    let stored = null;

    switch ( storage )
    {
      case 'localStorage':
        stored = localStorage.getItem( key );
        break;
      case 'sessionStorage':
        stored = sessionStorage.getItem( key );
        break;
      case 'auto':
        // Buscar primero en localStorage, luego sessionStorage
        stored = localStorage.getItem( key ) || sessionStorage.getItem( key );
        break;
      default:
        console.error( `Storage type "${ storage }" not supported` );
        return defaultValue;
    }

    return stored ? JSON.parse( stored ) : defaultValue;
  } catch ( error )
  {
    console.error( 'Error retrieving data:', error );
    return defaultValue;
  }
};

/**
 * Limpiar datos sensibles del almacenamiento
 * @param {string} reason - Razón de la limpieza (logout, security, etc.)
 */
export const clearSensitiveData = ( reason = 'security' ) => {
  console.log( `🧹 Limpiando datos sensibles: ${ reason }` );

  // Limpiar todo localStorage de manera selectiva
  const keysToRemove = [];
  for ( let i = 0; i < localStorage.length; i++ )
  {
    const key = localStorage.key( i );
    if ( key && key.startsWith( 'localtaste_' ) )
    {
      // Verificar si contiene datos sensibles
      if ( !isSafeForLocalStorage( key ) )
      {
        keysToRemove.push( key );
      }
    }
  }

  keysToRemove.forEach( key => {
    localStorage.removeItem( key );
    console.log( `🗑️ Removido: ${ key }` );
  } );

  // Limpiar sessionStorage completamente
  Object.values( AUTH_STORAGE.SESSION_STORAGE ).forEach( key => {
    sessionStorage.removeItem( key );
  } );

  console.log( '✅ Limpieza de seguridad completada' );
};

/**
 * Configurar cookies de autenticación de manera segura
 * Solo para referencia - la implementación real debe estar en el backend
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {Object} options - Opciones de la cookie
 */
export const setSecureCookie = ( name, value, options = {} ) => {
  // ⚠️ ADVERTENCIA: Las cookies HTTPOnly solo se pueden configurar desde el backend
  console.warn( '⚠️ Las cookies seguras (HTTPOnly) deben configurarse desde el backend, no desde JavaScript' );

  // Para desarrollo/testing - NO usar en producción para tokens
  const config = { ...AUTH_STORAGE.COOKIES.CONFIG, ...options };

  let cookieString = `${ name }=${ value }; `;
  cookieString += `Max-Age=${ config.expires }; `;
  cookieString += `SameSite=${ config.sameSite }; `;

  if ( config.secure && location.protocol === 'https:' )
  {
    cookieString += 'Secure; ';
  }

  document.cookie = cookieString;
};

/**
 * Auditar el almacenamiento actual para detectar problemas de seguridad
 * @returns {Object} Reporte de auditoría
 */
export const auditStorageSecurity = () => {
  const report = {
    issues: [],
    warnings: [],
    safe: [],
  };

  // Auditar localStorage
  for ( let i = 0; i < localStorage.length; i++ )
  {
    const key = localStorage.key( i );
    if ( key && key.startsWith( 'localtaste_' ) )
    {
      if ( !isSafeForLocalStorage( key ) )
      {
        report.issues.push( `🔴 CRÍTICO: "${ key }" contiene datos sensibles en LocalStorage` );
      } else
      {
        report.safe.push( `✅ "${ key }" es seguro en LocalStorage` );
      }
    }
  }

  // Verificar si hay tokens en localStorage (NUNCA debería pasar)
  const dangerousKeys = [ 'token', 'jwt', 'auth', 'password', 'secret' ];
  dangerousKeys.forEach( danger => {
    for ( let i = 0; i < localStorage.length; i++ )
    {
      const key = localStorage.key( i );
      if ( key && key.toLowerCase().includes( danger ) )
      {
        report.issues.push( `🚨 CRÍTICO: Posible token/credencial encontrada: "${ key }"` );
      }
    }
  } );

  return report;
};

// AbortController para solicitudes abortables
export const createAbortableRequest = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    abort: () => controller.abort()
  };
};