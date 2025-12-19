import { loadStripe } from '@stripe/stripe-js';
import { get as getCookie, set as setCookie, remove as removeCookie } from 'js-cookie';

/**
 * @fileoverview Configuración de Stripe para LocalTaste - Sistema de pagos y suscripciones
 * Proporciona integración completa con Stripe para procesamiento de pagos únicos,
 * suscripciones de cestas personalizadas y gestión de facturación del marketplace LocalTaste
 * @author LocalTaste Development Team
 * @version 1.0.0
 * @since 2025-12-19
 */

// ================================
// MONEDAS Y CONFIGURACIÓN REGIONAL
// ================================

/**
 * Monedas soportadas en LocalTaste
 * @readonly
 * @enum {string}
 */
export const SUPPORTED_CURRENCIES = {
  /** Euro - Moneda principal */
  EUR: 'eur',
  /** Dólar estadounidense */
  USD: 'usd',
  /** Libra esterlina */
  GBP: 'gbp',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( SUPPORTED_CURRENCIES );

/**
 * Configuración de localización y formato de monedas
 * @readonly
 */
export const CURRENCY_CONFIG = {
  [ SUPPORTED_CURRENCIES.EUR ]: {
    /** Símbolo de moneda */
    symbol: '€',
    /** Código de idioma/región */
    locale: 'es-ES',
    /** Posición del símbolo */
    symbolPosition: 'after',
    /** Decimales por defecto */
    decimals: 2,
  },
  [ SUPPORTED_CURRENCIES.USD ]: {
    symbol: '$',
    locale: 'en-US',
    symbolPosition: 'before',
    decimals: 2,
  },
  [ SUPPORTED_CURRENCIES.GBP ]: {
    symbol: '£',
    locale: 'en-GB',
    symbolPosition: 'before',
    decimals: 2,
  },
};

// Congelar configuraciones de moneda
Object.keys( CURRENCY_CONFIG ).forEach( key => {
  Object.freeze( CURRENCY_CONFIG[ key ] );
} );
Object.freeze( CURRENCY_CONFIG );

// ================================
// TIPOS DE PRODUCTOS Y PRECIOS
// ================================

/**
 * Tipos de productos para facturación en LocalTaste
 * @readonly
 * @enum {string}
 */
export const PRODUCT_TYPES = {
  /** Producto individual de un solo pago */
  ONE_TIME: 'one_time',
  /** Suscripción recurrente - HU02: Cestas personalizadas */
  SUBSCRIPTION: 'subscription',
  /** Comisión del marketplace para productores */
  COMMISSION: 'commission',
  /** Cuota de membresía premium para productores */
  MEMBERSHIP: 'membership',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( PRODUCT_TYPES );

/**
 * Intervalos de suscripción disponibles
 * @readonly
 * @enum {string}
 */
export const SUBSCRIPTION_INTERVALS = {
  /** Suscripción semanal */
  WEEKLY: 'week',
  /** Suscripción bisemanal */
  BIWEEKLY: 'biweek',
  /** Suscripción mensual */
  MONTHLY: 'month',
  /** Suscripción trimestral */
  QUARTERLY: 'quarter',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( SUBSCRIPTION_INTERVALS );

// ================================
// ESTADOS DE PAGO
// ================================

/**
 * Estados de pago y transacciones en Stripe
 * @readonly
 * @enum {string}
 */
export const PAYMENT_STATUS = {
  // === ESTADOS INICIALES ===
  /** Pago pendiente de procesamiento */
  PENDING: 'pending',
  /** Pago siendo procesado */
  PROCESSING: 'processing',

  // === ESTADOS EXITOSOS ===
  /** Pago completado exitosamente */
  SUCCEEDED: 'succeeded',
  /** Pago parcialmente reembolsado */
  PARTIALLY_REFUNDED: 'partially_refunded',

  // === ESTADOS DE FALLO ===
  /** Pago cancelado por el usuario */
  CANCELED: 'canceled',
  /** Pago rechazado por el banco/tarjeta */
  DECLINED: 'declined',
  /** Pago falló por motivos técnicos */
  FAILED: 'failed',
  /** Pago reembolsado completamente */
  REFUNDED: 'refunded',

  // === ESTADOS ESPECIALES ===
  /** Pago requiere autenticación adicional (3D Secure) */
  REQUIRES_ACTION: 'requires_action',
  /** Pago requiere confirmación */
  REQUIRES_CONFIRMATION: 'requires_confirmation',
  /** Pago en disputa/chargeback */
  DISPUTED: 'disputed',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( PAYMENT_STATUS );

/**
 * Estados de suscripciones en Stripe
 * @readonly
 * @enum {string}
 */
export const SUBSCRIPTION_STATUS = {
  /** Suscripción activa */
  ACTIVE: 'active',
  /** Suscripción en período de prueba */
  TRIALING: 'trialing',
  /** Suscripción pausada temporalmente */
  PAUSED: 'paused',
  /** Suscripción cancelada pero aún activa hasta el final del período */
  CANCELED: 'canceled',
  /** Suscripción vencida/inactiva */
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  /** Suscripción incompleta (pago fallido) */
  INCOMPLETE: 'incomplete',
  /** Suscripción con pago vencido */
  PAST_DUE: 'past_due',
  /** Suscripción cancelada definitivamente */
  UNPAID: 'unpaid',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( SUBSCRIPTION_STATUS );

// ================================
// MÉTODOS DE PAGO
// ================================

/**
 * Métodos de pago soportados por LocalTaste
 * @readonly
 * @enum {string}
 */
export const PAYMENT_METHODS = {
  // === TARJETAS DE CRÉDITO/DÉBITO ===
  /** Tarjeta de crédito/débito */
  CARD: 'card',

  // === WALLETS DIGITALES ===
  /** Apple Pay */
  APPLE_PAY: 'apple_pay',
  /** Google Pay */
  GOOGLE_PAY: 'google_pay',
  /** PayPal */
  PAYPAL: 'paypal',

  // === TRANSFERENCIAS BANCARIAS ===
  /** Transferencia bancaria SEPA (Europa) */
  SEPA_DEBIT: 'sepa_debit',
  /** Transferencia bancaria */
  BANK_TRANSFER: 'bank_transfer',

  // === OTROS MÉTODOS LOCALES ===
  /** Bizum (España) */
  BIZUM: 'bizum',
  /** iDEAL (Países Bajos) */
  IDEAL: 'ideal',
  /** Sofort (Alemania) */
  SOFORT: 'sofort',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( PAYMENT_METHODS );

// ================================
// CONFIGURACIÓN DE STRIPE
// ================================

/**
 * Configuración principal de Stripe para LocalTaste
 * @readonly
 */
export const STRIPE_CONFIG = {
  /** Clave pública de Stripe según el entorno */
  publishableKey: process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY,

  /** Configuración de apariencia */
  APPEARANCE: {
    /** Tema del formulario de pago */
    theme: 'stripe',
    /** Variables de diseño personalizadas */
    variables: {
      colorPrimary: '#10B981', // Verde LocalTaste
      colorBackground: '#ffffff',
      colorText: '#374151',
      colorDanger: '#EF4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    /** Reglas CSS personalizadas */
    rules: {
      '.Input': {
        border: '1px solid #D1D5DB',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      '.Input:focus': {
        border: '1px solid #10B981',
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
      },
    },
  },

  /** Configuración de elementos */
  ELEMENTS_OPTIONS: {
    /** Moneda por defecto */
    currency: SUPPORTED_CURRENCIES.EUR,
    /** Modo de configuración */
    mode: 'payment',
    /** Capturar pago automáticamente */
    captureMethod: 'automatic',
    /** Métodos de pago disponibles */
    paymentMethodTypes: [
      PAYMENT_METHODS.CARD,
      PAYMENT_METHODS.APPLE_PAY,
      PAYMENT_METHODS.GOOGLE_PAY,
      PAYMENT_METHODS.SEPA_DEBIT,
    ],
  },

  /** Configuración de seguridad */
  SECURITY: {
    /** Nombre de la cookie para Customer ID */
    customerCookie: 'stripe_customer_id',
    /** Tiempo de vida de la cookie (7 días) */
    cookieMaxAge: 7,
    /** HTTPOnly para mayor seguridad */
    cookieHttpOnly: false, // Frontend necesita leerla
    /** Secure en producción */
    cookieSecure: process.env.NODE_ENV === 'production',
    /** SameSite para CSRF protection */
    cookieSameSite: 'lax',
  },

  /** URLs de webhooks y endpoints */
  ENDPOINTS: {
    /** URL base de la API */
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    /** Endpoint para crear Payment Intent */
    createPaymentIntent: '/payments/create-intent',
    /** Endpoint para confirmar pago */
    confirmPayment: '/payments/confirm',
    /** Endpoint para crear suscripción */
    createSubscription: '/subscriptions/create',
    /** Endpoint para gestionar suscripción */
    manageSubscription: '/subscriptions/manage',
    /** Endpoint para webhooks */
    webhooks: '/webhooks/stripe',
    /** Endpoint para portal de cliente */
    customerPortal: '/billing/portal',
  },
};

// Congelar configuraciones
Object.freeze( STRIPE_CONFIG.APPEARANCE.variables );
Object.freeze( STRIPE_CONFIG.APPEARANCE.rules );
Object.freeze( STRIPE_CONFIG.APPEARANCE );
Object.freeze( STRIPE_CONFIG.ELEMENTS_OPTIONS );
Object.freeze( STRIPE_CONFIG.SECURITY );
Object.freeze( STRIPE_CONFIG.ENDPOINTS );
Object.freeze( STRIPE_CONFIG );

// ================================
// MENSAJES Y TEXTOS
// ================================

/**
 * Mensajes de error para pagos y suscripciones
 * @readonly
 */
export const STRIPE_ERRORS = {
  // === ERRORES DE CONFIGURACIÓN ===
  STRIPE_NOT_INITIALIZED: 'Stripe no está inicializado correctamente.',
  INVALID_PUBLISHABLE_KEY: 'Clave pública de Stripe inválida o no configurada.',
  MISSING_ELEMENTS: 'Elementos de Stripe no están disponibles.',

  // === ERRORES DE TARJETA ===
  CARD_DECLINED: 'Tu tarjeta fue rechazada. Intenta con otra tarjeta.',
  CARD_EXPIRED: 'Tu tarjeta ha expirado. Actualiza la información.',
  CARD_INSUFFICIENT_FUNDS: 'Fondos insuficientes en tu tarjeta.',
  CARD_INVALID_NUMBER: 'Número de tarjeta inválido.',
  CARD_INVALID_CVC: 'Código CVC inválido.',
  CARD_INVALID_EXPIRY: 'Fecha de expiración inválida.',

  // === ERRORES DE PROCESAMIENTO ===
  PAYMENT_FAILED: 'El pago no pudo ser procesado. Intenta nuevamente.',
  PAYMENT_CANCELED: 'El pago fue cancelado por el usuario.',
  PROCESSING_ERROR: 'Error procesando el pago. Contacta soporte si persiste.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta nuevamente.',

  // === ERRORES DE SUSCRIPCIONES ===
  SUBSCRIPTION_CREATION_FAILED: 'No se pudo crear la suscripción.',
  SUBSCRIPTION_UPDATE_FAILED: 'No se pudo actualizar la suscripción.',
  SUBSCRIPTION_CANCEL_FAILED: 'No se pudo cancelar la suscripción.',
  SUBSCRIPTION_NOT_FOUND: 'Suscripción no encontrada.',

  // === ERRORES DE AUTENTICACIÓN ===
  AUTHENTICATION_REQUIRED: 'Se requiere autenticación adicional para completar el pago.',
  AUTHENTICATION_FAILED: 'La autenticación del pago falló.',

  // === ERRORES GENERALES ===
  CUSTOMER_CREATION_FAILED: 'No se pudo crear el perfil de facturación.',
  AMOUNT_TOO_SMALL: 'El monto es demasiado pequeño.',
  AMOUNT_TOO_LARGE: 'El monto excede el límite permitido.',
  CURRENCY_NOT_SUPPORTED: 'Moneda no soportada.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( STRIPE_ERRORS );

/**
 * Mensajes de éxito para pagos y suscripciones
 * @readonly
 */
export const STRIPE_SUCCESS = {
  // === PAGOS ÚNICOS ===
  PAYMENT_SUCCEEDED: 'Pago procesado exitosamente.',
  PAYMENT_CONFIRMED: 'Pago confirmado correctamente.',
  REFUND_PROCESSED: 'Reembolso procesado exitosamente.',

  // === SUSCRIPCIONES ===
  SUBSCRIPTION_CREATED: 'Suscripción creada exitosamente.',
  SUBSCRIPTION_UPDATED: 'Suscripción actualizada correctamente.',
  SUBSCRIPTION_CANCELED: 'Suscripción cancelada correctamente.',
  SUBSCRIPTION_PAUSED: 'Suscripción pausada exitosamente.',
  SUBSCRIPTION_RESUMED: 'Suscripción reanudada exitosamente.',

  // === GESTIÓN DE CLIENTE ===
  CUSTOMER_CREATED: 'Perfil de facturación creado exitosamente.',
  PAYMENT_METHOD_SAVED: 'Método de pago guardado exitosamente.',
  PAYMENT_METHOD_UPDATED: 'Método de pago actualizado exitosamente.',
  PAYMENT_METHOD_REMOVED: 'Método de pago eliminado exitosamente.',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( STRIPE_SUCCESS );

/**
 * Mensajes informativos del sistema de pagos
 * @readonly
 */
export const STRIPE_MESSAGES = {
  // === INFORMACIÓN DE PROCESAMIENTO ===
  PROCESSING_PAYMENT: 'Procesando pago...',
  REDIRECTING_TO_BANK: 'Redirigiendo para autenticación bancaria...',
  PAYMENT_REQUIRES_ACTION: 'Tu banco requiere autenticación adicional.',

  // === INFORMACIÓN DE SUSCRIPCIONES ===
  TRIAL_PERIOD_ACTIVE: 'Período de prueba activo.',
  SUBSCRIPTION_WILL_RENEW: 'Tu suscripción se renovará automáticamente.',
  SUBSCRIPTION_WILL_CANCEL: 'Tu suscripción se cancelará al final del período.',

  // === INFORMACIÓN GENERAL ===
  LOADING_STRIPE: 'Cargando sistema de pagos...',
  SECURE_PAYMENT: 'Pago seguro procesado por Stripe.',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( STRIPE_MESSAGES );

// ================================
// EVENTOS DE STRIPE
// ================================

/**
 * Eventos de Stripe para event listeners
 * @readonly
 */
export const STRIPE_EVENTS = {
  // === EVENTOS DE INICIALIZACIÓN ===
  STRIPE_LOADED: 'stripe:loaded',
  STRIPE_LOAD_ERROR: 'stripe:load-error',
  ELEMENTS_CREATED: 'stripe:elements:created',

  // === EVENTOS DE PAGOS ===
  PAYMENT_STARTED: 'stripe:payment:started',
  PAYMENT_PROCESSING: 'stripe:payment:processing',
  PAYMENT_SUCCEEDED: 'stripe:payment:succeeded',
  PAYMENT_FAILED: 'stripe:payment:failed',
  PAYMENT_CANCELED: 'stripe:payment:canceled',
  PAYMENT_REQUIRES_ACTION: 'stripe:payment:requires-action',

  // === EVENTOS DE SUSCRIPCIONES ===
  SUBSCRIPTION_CREATED: 'stripe:subscription:created',
  SUBSCRIPTION_UPDATED: 'stripe:subscription:updated',
  SUBSCRIPTION_CANCELED: 'stripe:subscription:canceled',
  SUBSCRIPTION_PAUSED: 'stripe:subscription:paused',
  SUBSCRIPTION_RESUMED: 'stripe:subscription:resumed',
  SUBSCRIPTION_EXPIRED: 'stripe:subscription:expired',

  // === EVENTOS DE CUSTOMER ===
  CUSTOMER_CREATED: 'stripe:customer:created',
  PAYMENT_METHOD_ATTACHED: 'stripe:payment-method:attached',
  PAYMENT_METHOD_DETACHED: 'stripe:payment-method:detached',

  // === EVENTOS ESPECÍFICOS DE LOCALTASTE ===
  // Cestas personalizadas - HU02
  CUSTOM_BASKET_SUBSCRIPTION_CREATED: 'stripe:custom-basket:created',
  CUSTOM_BASKET_SUBSCRIPTION_MODIFIED: 'stripe:custom-basket:modified',

  // Pagos a productores
  PRODUCER_PAYOUT_PROCESSED: 'stripe:producer:payout-processed',
  COMMISSION_CALCULATED: 'stripe:commission:calculated',
};

// Congelar objeto para prevenir modificaciones
Object.freeze( STRIPE_EVENTS );

// ================================
// CLASE PRINCIPAL: STRIPE MANAGER
// ================================

/**
 * Gestor de Stripe para LocalTaste
 * Implementa patrón Singleton para gestión centralizada de pagos y suscripciones
 */
class StripeManager {
  /**
   * Constructor del gestor de Stripe
   * Inicializa estado interno usando configuración segura
   */
  constructor () {
    /** @type {Stripe|null} Instancia de Stripe */
    this.stripe = null;
    /** @type {StripeElements|null} Instancia de Stripe Elements */
    this.elements = null;
    /** @type {boolean} Estado de inicialización */
    this.isInitialized = false;
    /** @type {string|null} ID del cliente en Stripe */
    this.customerId = null;
    /** @type {Object} Cache de métodos de pago */
    this.paymentMethodsCache = new Map();
    /** @type {Object} Cache de suscripciones */
    this.subscriptionsCache = new Map();
  }

  /**
   * Inicializa Stripe con la clave pública configurada
   * @returns {Promise<boolean>} True si la inicialización fue exitosa
   */
  async initialize () {
    if ( this.isInitialized )
    {
      console.log( 'ℹ️ Stripe ya está inicializado' );
      return true;
    }

    const publishableKey = STRIPE_CONFIG.publishableKey;

    if ( !publishableKey )
    {
      console.error( '🔐', STRIPE_ERRORS.INVALID_PUBLISHABLE_KEY );
      return false;
    }

    try
    {
      // Cargar Stripe de forma asíncrona
      this.stripe = await loadStripe( publishableKey, {
        locale: 'es', // Español por defecto para LocalTaste
        apiVersion: '2023-10-16', // Versión estable de Stripe API
      } );

      if ( !this.stripe )
      {
        throw new Error( 'No se pudo cargar Stripe' );
      }

      // Recuperar Customer ID de cookies si existe
      this.customerId = getCookie( STRIPE_CONFIG.SECURITY.customerCookie );

      this.isInitialized = true;
      console.log( '✅ Stripe inicializado correctamente' );

      // Emitir evento de inicialización
      this.dispatchEvent( STRIPE_EVENTS.STRIPE_LOADED, {
        customerId: this.customerId,
        timestamp: Date.now(),
      } );

      return true;

    } catch ( error )
    {
      console.error( '🔥', STRIPE_ERRORS.STRIPE_NOT_INITIALIZED, error );

      this.dispatchEvent( STRIPE_EVENTS.STRIPE_LOAD_ERROR, {
        error: error.message,
        timestamp: Date.now(),
      } );

      return false;
    }
  }

  /**
   * Crea elementos de Stripe para formularios de pago
   * @param {Object} options - Opciones personalizadas para elementos
   * @returns {StripeElements|null} Instancia de elementos o null si falla
   */
  createElements ( options = {} ) {
    if ( !this.stripe )
    {
      console.error( '❌', STRIPE_ERRORS.STRIPE_NOT_INITIALIZED );
      return null;
    }

    const elementsOptions = {
      ...STRIPE_CONFIG.ELEMENTS_OPTIONS,
      ...options,
      appearance: STRIPE_CONFIG.APPEARANCE,
    };

    this.elements = this.stripe.elements( elementsOptions );

    if ( this.elements )
    {
      console.log( '✅ Elementos de Stripe creados correctamente' );

      this.dispatchEvent( STRIPE_EVENTS.ELEMENTS_CREATED, {
        options: elementsOptions,
        timestamp: Date.now(),
      } );
    }

    return this.elements;
  }

  /**
   * Procesa un pago único (productos individuales)
   * @param {string} paymentIntentClientSecret - Client secret del Payment Intent
   * @param {Object} paymentElement - Elemento de pago de Stripe
   * @param {Object} options - Opciones adicionales del pago
   * @returns {Promise<Object>} Resultado del pago
   */
  async processPayment ( paymentIntentClientSecret, paymentElement, options = {} ) {
    if ( !this.stripe || !paymentIntentClientSecret )
    {
      throw new Error( STRIPE_ERRORS.STRIPE_NOT_INITIALIZED );
    }

    try
    {
      // Emitir evento de inicio de pago
      this.dispatchEvent( STRIPE_EVENTS.PAYMENT_STARTED, {
        timestamp: Date.now(),
      } );

      // Confirmar pago con Stripe
      const { error, paymentIntent } = await this.stripe.confirmPayment( {
        elements: this.elements,
        clientSecret: paymentIntentClientSecret,
        confirmParams: {
          return_url: `${ window.location.origin }/payment/success`,
          ...options.confirmParams,
        },
        redirect: 'if_required', // Evitar redirección innecesaria
      } );

      if ( error )
      {
        // Mapear errores específicos de Stripe
        const userFriendlyError = this.mapStripeError( error );

        this.dispatchEvent( STRIPE_EVENTS.PAYMENT_FAILED, {
          error: userFriendlyError,
          originalError: error,
          timestamp: Date.now(),
        } );

        return {
          success: false,
          error: userFriendlyError,
          requiresAction: error.type === 'card_error' && error.code === 'authentication_required',
        };
      }

      // Pago exitoso
      const result = {
        success: true,
        paymentIntent,
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };

      this.dispatchEvent( STRIPE_EVENTS.PAYMENT_SUCCEEDED, {
        ...result,
        timestamp: Date.now(),
      } );

      console.log( '✅', STRIPE_SUCCESS.PAYMENT_SUCCEEDED, paymentIntent.id );
      return result;

    } catch ( error )
    {
      console.error( '🔥 Error procesando pago:', error );

      this.dispatchEvent( STRIPE_EVENTS.PAYMENT_FAILED, {
        error: error.message,
        timestamp: Date.now(),
      } );

      return {
        success: false,
        error: STRIPE_ERRORS.PROCESSING_ERROR,
      };
    }
  }

  /**
   * Crea una suscripción para cestas personalizadas (HU02)
   * @param {Object} subscriptionData - Datos de la suscripción
   * @returns {Promise<Object>} Resultado de la creación de suscripción
   */
  async createSubscription ( subscriptionData ) {
    if ( !this.stripe )
    {
      throw new Error( STRIPE_ERRORS.STRIPE_NOT_INITIALIZED );
    }

    try
    {
      const {
        priceId,
        customerId,
        paymentMethodId,
        interval = SUBSCRIPTION_INTERVALS.MONTHLY,
        metadata = {},
      } = subscriptionData;

      // Llamar al backend para crear la suscripción
      const response = await fetch(
        `${ STRIPE_CONFIG.ENDPOINTS.baseUrl }${ STRIPE_CONFIG.ENDPOINTS.createSubscription }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ getCookie( 'auth_token' ) }`,
          },
          body: JSON.stringify( {
            priceId,
            customerId: customerId || this.customerId,
            paymentMethodId,
            interval,
            metadata: {
              ...metadata,
              source: 'localtaste_frontend',
              type: PRODUCT_TYPES.SUBSCRIPTION,
            },
          } ),
        }
      );

      const result = await response.json();

      if ( !response.ok )
      {
        throw new Error( result.error || STRIPE_ERRORS.SUBSCRIPTION_CREATION_FAILED );
      }

      // Cache la suscripción
      this.subscriptionsCache.set( result.subscription.id, result.subscription );

      this.dispatchEvent( STRIPE_EVENTS.SUBSCRIPTION_CREATED, {
        subscription: result.subscription,
        timestamp: Date.now(),
      } );

      console.log( '✅', STRIPE_SUCCESS.SUBSCRIPTION_CREATED, result.subscription.id );
      return {
        success: true,
        subscription: result.subscription,
      };

    } catch ( error )
    {
      console.error( '🔥 Error creando suscripción:', error );

      this.dispatchEvent( STRIPE_EVENTS.SUBSCRIPTION_CREATED, {
        error: error.message,
        timestamp: Date.now(),
      } );

      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Gestiona suscripciones existentes (pausar, reanudar, cancelar)
   * @param {string} subscriptionId - ID de la suscripción
   * @param {string} action - Acción a realizar
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Object>} Resultado de la gestión
   */
  async manageSubscription ( subscriptionId, action, options = {} ) {
    if ( !this.stripe )
    {
      throw new Error( STRIPE_ERRORS.STRIPE_NOT_INITIALIZED );
    }

    const validActions = [ 'pause', 'resume', 'cancel', 'update' ];
    if ( !validActions.includes( action ) )
    {
      throw new Error( `Acción inválida: ${ action }` );
    }

    try
    {
      const response = await fetch(
        `${ STRIPE_CONFIG.ENDPOINTS.baseUrl }${ STRIPE_CONFIG.ENDPOINTS.manageSubscription }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ getCookie( 'auth_token' ) }`,
          },
          body: JSON.stringify( {
            subscriptionId,
            action,
            ...options,
          } ),
        }
      );

      const result = await response.json();

      if ( !response.ok )
      {
        throw new Error( result.error || STRIPE_ERRORS.SUBSCRIPTION_UPDATE_FAILED );
      }

      // Actualizar cache
      this.subscriptionsCache.set( subscriptionId, result.subscription );

      // Emitir evento específico según la acción
      const eventMap = {
        pause: STRIPE_EVENTS.SUBSCRIPTION_PAUSED,
        resume: STRIPE_EVENTS.SUBSCRIPTION_RESUMED,
        cancel: STRIPE_EVENTS.SUBSCRIPTION_CANCELED,
        update: STRIPE_EVENTS.SUBSCRIPTION_UPDATED,
      };

      this.dispatchEvent( eventMap[ action ], {
        subscription: result.subscription,
        timestamp: Date.now(),
      } );

      const successMap = {
        pause: STRIPE_SUCCESS.SUBSCRIPTION_PAUSED,
        resume: STRIPE_SUCCESS.SUBSCRIPTION_RESUMED,
        cancel: STRIPE_SUCCESS.SUBSCRIPTION_CANCELED,
        update: STRIPE_SUCCESS.SUBSCRIPTION_UPDATED,
      };

      console.log( '✅', successMap[ action ], subscriptionId );
      return {
        success: true,
        subscription: result.subscription,
      };

    } catch ( error )
    {
      console.error( `🔥 Error gestionando suscripción (${ action }):`, error );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Crea o recupera un cliente de Stripe
   * @param {Object} customerData - Datos del cliente
   * @returns {Promise<Object>} Resultado de la operación
   */
  async createOrRetrieveCustomer ( customerData ) {
    try
    {
      // Si ya tenemos un Customer ID, intentar recuperar
      if ( this.customerId )
      {
        const response = await fetch(
          `${ STRIPE_CONFIG.ENDPOINTS.baseUrl }/customers/${ this.customerId }`,
          {
            headers: {
              'Authorization': `Bearer ${ getCookie( 'auth_token' ) }`,
            },
          }
        );

        if ( response.ok )
        {
          const customer = await response.json();
          return {
            success: true,
            customer,
            created: false,
          };
        }
      }

      // Crear nuevo cliente
      const response = await fetch(
        `${ STRIPE_CONFIG.ENDPOINTS.baseUrl }/customers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ getCookie( 'auth_token' ) }`,
          },
          body: JSON.stringify( customerData ),
        }
      );

      const result = await response.json();

      if ( !response.ok )
      {
        throw new Error( result.error || STRIPE_ERRORS.CUSTOMER_CREATION_FAILED );
      }

      // Guardar Customer ID en cookie segura
      this.customerId = result.customer.id;
      setCookie(
        STRIPE_CONFIG.SECURITY.customerCookie,
        this.customerId,
        {
          expires: STRIPE_CONFIG.SECURITY.cookieMaxAge,
          secure: STRIPE_CONFIG.SECURITY.cookieSecure,
          sameSite: STRIPE_CONFIG.SECURITY.cookieSameSite,
        }
      );

      this.dispatchEvent( STRIPE_EVENTS.CUSTOMER_CREATED, {
        customer: result.customer,
        timestamp: Date.now(),
      } );

      console.log( '✅', STRIPE_SUCCESS.CUSTOMER_CREATED, result.customer.id );
      return {
        success: true,
        customer: result.customer,
        created: true,
      };

    } catch ( error )
    {
      console.error( '🔥 Error creando/recuperando cliente:', error );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Mapea errores de Stripe a mensajes amigables para el usuario
   * @param {Object} stripeError - Error de Stripe
   * @returns {string} Mensaje de error amigable
   */
  mapStripeError ( stripeError ) {
    const errorMap = {
      // Errores de tarjeta
      'card_declined': STRIPE_ERRORS.CARD_DECLINED,
      'expired_card': STRIPE_ERRORS.CARD_EXPIRED,
      'insufficient_funds': STRIPE_ERRORS.CARD_INSUFFICIENT_FUNDS,
      'invalid_number': STRIPE_ERRORS.CARD_INVALID_NUMBER,
      'invalid_cvc': STRIPE_ERRORS.CARD_INVALID_CVC,
      'invalid_expiry_month': STRIPE_ERRORS.CARD_INVALID_EXPIRY,
      'invalid_expiry_year': STRIPE_ERRORS.CARD_INVALID_EXPIRY,

      // Errores de procesamiento
      'processing_error': STRIPE_ERRORS.PROCESSING_ERROR,
      'authentication_required': STRIPE_ERRORS.AUTHENTICATION_REQUIRED,

      // Errores de monto
      'amount_too_small': STRIPE_ERRORS.AMOUNT_TOO_SMALL,
      'amount_too_large': STRIPE_ERRORS.AMOUNT_TOO_LARGE,

      // Errores de moneda
      'currency_not_supported': STRIPE_ERRORS.CURRENCY_NOT_SUPPORTED,
    };

    return errorMap[ stripeError.code ] || STRIPE_ERRORS.UNKNOWN_ERROR;
  }

  /**
   * Formatea un monto según la configuración de moneda
   * @param {number} amount - Monto en centavos
   * @param {string} currency - Código de moneda
   * @returns {string} Monto formateado
   */
  formatAmount ( amount, currency = SUPPORTED_CURRENCIES.EUR ) {
    const config = CURRENCY_CONFIG[ currency ];
    if ( !config )
    {
      return `${ amount / 100 } ${ currency.toUpperCase() }`;
    }

    const formattedAmount = new Intl.NumberFormat( config.locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    } ).format( amount / 100 );

    return formattedAmount;
  }

  /**
   * Valida los datos de una suscripción
   * @param {Object} subscriptionData - Datos a validar
   * @returns {Object} Resultado de la validación
   */
  validateSubscriptionData ( subscriptionData ) {
    const errors = [];

    if ( !subscriptionData.priceId )
    {
      errors.push( 'ID de precio es requerido' );
    }

    if ( subscriptionData.interval && !Object.values( SUBSCRIPTION_INTERVALS ).includes( subscriptionData.interval ) )
    {
      errors.push( 'Intervalo de suscripción inválido' );
    }

    if ( subscriptionData.amount && subscriptionData.amount < 50 )
    {
      errors.push( 'El monto mínimo es €0.50' );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Obtiene el estado de salud del sistema de pagos
   * @returns {Object} Estado de salud
   */
  getHealthStatus () {
    return {
      stripeInitialized: this.isInitialized,
      stripeInstance: !!this.stripe,
      elementsInstance: !!this.elements,
      customerId: this.customerId,
      paymentMethodsCached: this.paymentMethodsCache.size,
      subscriptionsCached: this.subscriptionsCache.size,
      timestamp: Date.now(),
    };
  }

  /**
   * Limpia el estado y desconecta Stripe
   */
  disconnect () {
    this.stripe = null;
    this.elements = null;
    this.isInitialized = false;
    this.paymentMethodsCache.clear();
    this.subscriptionsCache.clear();

    // Limpiar Customer ID de cookies si es necesario
    // removeCookie( STRIPE_CONFIG.SECURITY.customerCookie );

    console.log( '🔌 Stripe desconectado y estado limpiado' );
  }

  /**
   * Emite un evento personalizado
   * @param {string} eventName - Nombre del evento
   * @param {Object} detail - Detalles del evento
   */
  dispatchEvent ( eventName, detail = {} ) {
    const event = new CustomEvent( eventName, {
      detail: {
        source: 'StripeManager',
        ...detail,
      },
    } );
    window.dispatchEvent( event );
  }
}

// ================================
// INSTANCIA SINGLETON Y UTILIDADES
// ================================

/**
 * Instancia singleton del gestor de Stripe
 * @type {StripeManager}
 */
const stripeManager = new StripeManager();

/**
 * Inicializa Stripe de forma segura
 * @returns {Promise<boolean>} True si la inicialización fue exitosa
 */
export const initializeStripe = async () => {
  return await stripeManager.initialize();
};

/**
 * Obtiene la instancia de Stripe inicializada
 * @returns {Stripe|null} Instancia de Stripe o null si no está inicializado
 */
export const getStripe = () => {
  return stripeManager.stripe;
};

/**
 * Obtiene la instancia de elementos de Stripe
 * @param {Object} options - Opciones para elementos
 * @returns {StripeElements|null} Instancia de elementos o null si falla
 */
export const getElements = ( options = {} ) => {
  return stripeManager.createElements( options );
};

/**
 * Procesa un pago único
 * @param {string} clientSecret - Client secret del Payment Intent
 * @param {Object} paymentElement - Elemento de pago
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} Resultado del pago
 */
export const processPayment = async ( clientSecret, paymentElement, options = {} ) => {
  return await stripeManager.processPayment( clientSecret, paymentElement, options );
};

/**
 * Crea una suscripción de cesta personalizada
 * @param {Object} subscriptionData - Datos de la suscripción
 * @returns {Promise<Object>} Resultado de la operación
 */
export const createCustomBasketSubscription = async ( subscriptionData ) => {
  return await stripeManager.createSubscription( {
    ...subscriptionData,
    metadata: {
      type: 'custom_basket',
      source: 'localtaste',
      ...( subscriptionData.metadata || {} ),
    },
  } );
};

/**
 * Gestiona una suscripción existente
 * @param {string} subscriptionId - ID de la suscripción
 * @param {string} action - Acción a realizar
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} Resultado de la operación
 */
export const manageSubscription = async ( subscriptionId, action, options = {} ) => {
  return await stripeManager.manageSubscription( subscriptionId, action, options );
};

/**
 * Formatea un monto para mostrar al usuario
 * @param {number} amount - Monto en centavos
 * @param {string} currency - Código de moneda
 * @returns {string} Monto formateado
 */
export const formatPrice = ( amount, currency = SUPPORTED_CURRENCIES.EUR ) => {
  return stripeManager.formatAmount( amount, currency );
};

/**
 * Valida los datos de una suscripción antes de crear
 * @param {Object} data - Datos a validar
 * @returns {Object} Resultado de la validación
 */
export const validateSubscription = ( data ) => {
  return stripeManager.validateSubscriptionData( data );
};

/**
 * Verifica si Stripe está inicializado y listo para usar
 * @returns {boolean} True si está listo
 */
export const isStripeReady = () => {
  return stripeManager.isInitialized && !!stripeManager.stripe;
};

/**
 * Obtiene el estado de salud del sistema de pagos
 * @returns {Object} Estado de salud completo
 */
export const getPaymentSystemHealth = () => {
  return stripeManager.getHealthStatus();
};

/**
 * Desconecta y limpia el estado de Stripe
 */
export const disconnectStripe = () => {
  stripeManager.disconnect();
};

// ================================
// EXPORTACIÓN DEFAULT
// ================================

/**
 * Exportación por defecto del gestor de Stripe
 */
export default stripeManager;
