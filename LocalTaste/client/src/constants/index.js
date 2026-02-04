/**
 * CONSTANTES GLOBALES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todas las constantes utilizadas en la aplicación
 * para evitar valores hardcodeados y facilitar el mantenimiento.
 * 
 * @module constants
 */

// ============================================================================
// CONFIGURACIÓN DE PAGINACIÓN
// ============================================================================

/**
 * Configuración de elementos por página para diferentes vistas
 */
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,      // Productos mostrados por página
  PRODUCERS_PER_PAGE: 9,      // Productores mostrados por página
  MAX_VISIBLE_PAGES: 5        // Número máximo de páginas visibles en el paginador
};

// ============================================================================
// OPCIONES DE ORDENAMIENTO
// ============================================================================

/**
 * Opciones de ordenamiento disponibles para productos
 * El objeto mapea el valor interno con la etiqueta visible al usuario
 */
export const PRODUCT_SORT_OPTIONS = {
  relevancia: 'Relevancia',
  'mejor-valorados': '⭐ Mejor Valorados',
  'recien-cosechado': '🌱 Recién Cosechado',
  ofertas: '🏷️ Ofertas',
  popularidad: '❤️ Más Populares',
  'precio-asc': '💰 Precio: Menor a Mayor',
  'precio-desc': '💰 Precio: Mayor a Menor',
  alfabetico: '🔤 A-Z'
};

/**
 * Opciones de ordenamiento disponibles para productores
 */
export const PRODUCER_SORT_OPTIONS = {
  relevancia: 'Relevancia',
  'mejor-valorados': '⭐ Mejor Valorados',
  'mas-cercanos': '📍 Más Cercanos',
  'mas-lejanos': '📍 Más Lejanos',
  popularidad: '❤️ Más Populares',
  nuevos: '🆕 Nuevos',
  alfabetico: '🔤 A-Z'
};

// ============================================================================
// CATEGORÍAS Y TIPOS
// ============================================================================

/**
 * Mapeo de categorías de productos a sus tipos correspondientes
 * Permite agrupar múltiples tipos bajo una misma categoría visual
 */
export const PRODUCT_CATEGORIES = {
  'Frutas y Verduras': [ 'Fruta', 'Verdura' ],
  'Lácteos y Huevos': [ 'Lácteo', 'Huevos' ],
  'Panadería Artesanal': [ 'Panadería' ],
  'Carnes y Embutidos': [ 'Carne', 'Embutidos' ],
  'Miel y Mermeladas': [ 'Miel', 'Mermelada' ]
};

/**
 * Tipos de producción disponibles para productores
 */
export const PRODUCTION_TYPES = {
  ecologica: 'Ecológica',
  artesanal: 'Artesanal',
  tradicional: 'Tradicional',
  biodinamica: 'Biodinámica'
};

/**
 * Categorías de negocio para registro de productores
 */
export const BUSINESS_CATEGORIES = [
  'Verduras y Hortalizas',
  'Frutas',
  'Lácteos y Huevos',
  'Miel y Conservas',
  'Panadería',
  'Carnes y Embutidos'
];

// ============================================================================
// FILTROS PREDEFINIDOS
// ============================================================================

/**
 * Filtros rápidos predefinidos para productos
 */
export const PRODUCT_FILTERS = {
  todos: 'Todos',
  organico: 'Orgánico',
  'sin-lactosa': 'Sin Lactosa',
  'sin-gluten': 'Sin Gluten',
  vegano: 'Vegano',
  'mejor-valorados': 'Mejor Valorados'
};

// ============================================================================
// CONFIGURACIÓN DE DEBOUNCE
// ============================================================================

/**
 * Tiempos de espera (en ms) para diferentes operaciones con debounce
 * Ayuda a optimizar el rendimiento evitando llamadas excesivas
 */
export const DEBOUNCE_DELAY = {
  SEARCH: 300,      // Búsqueda de texto
  FILTER: 300,      // Cambios de filtros
  PRICE: 500        // Ajustes de rango de precio
};

// ============================================================================
// OPCIONES DE RATING
// ============================================================================

/**
 * Opciones de filtrado por valoración
 */
export const RATING_OPTIONS = [
  { value: 0, label: 'Todas las valoraciones' },
  { value: 3, label: '3★ o más' },
  { value: 4, label: '4★ o más' },
  { value: 4.5, label: '4.5★ o más' }
];

// ============================================================================
// VALIDACIÓN DE FORMULARIOS
// ============================================================================

/**
 * Reglas de validación para formularios
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,                                    // Longitud mínima de contraseña
  NAME_MIN_LENGTH: 2,                                        // Longitud mínima de nombre
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/                 // Patrón de validación de email
};

// ============================================================================
// RUTAS DE LA APLICACIÓN
// ============================================================================

/**
 * Rutas principales de la aplicación
 * Centraliza las URLs para facilitar cambios futuros
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCERS: '/producers',
  LOGIN: '/auth/loggin',
  REGISTER: '/auth/register',
  OUR_HISTORY: '/ourHistory',
  OUR_MISSION: '/ourMision'
};

// ============================================================================
// MENSAJES DE ERROR COMUNES
// ============================================================================

/**
 * Mensajes de error estandarizados
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'El email no es válido',
  PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden',
  GENERIC_ERROR: 'Ha ocurrido un error. Por favor, intenta de nuevo.'
};

// ============================================================================
// CONFIGURACIÓN DE PRECIOS
// ============================================================================

/**
 * Configuración relacionada con precios
 */
export const PRICE_CONFIG = {
  CURRENCY: '€',
  DECIMALS: 2,
  MIN_PRICE: 0,
  DEFAULT_MAX_PRICE: 100
};
