/**
 * UTILIDADES GENERALES
 * 
 * Este archivo contiene funciones de utilidad reutilizables en toda la aplicación.
 * Incluye formateo, validación, cálculos y operaciones comunes.
 * 
 * @module utils
 */

import { PRICE_CONFIG } from '@/constants';

// ============================================================================
// FORMATEO DE DATOS
// ============================================================================

/**
 * Formatea un precio en euros
 * 
 * @param {number} price - Precio a formatear
 * @param {number} decimals - Número de decimales (default: 2)
 * @returns {string} Precio formateado con símbolo de euro
 * 
 * @example
 * formatPrice(12.5) // "12.50 €"
 * formatPrice(100, 0) // "100 €"
 */
export function formatPrice ( price, decimals = PRICE_CONFIG.DECIMALS ) {
  if ( typeof price !== 'number' || isNaN( price ) ) return `0.${ '0'.repeat( decimals ) } ${ PRICE_CONFIG.CURRENCY }`;
  return `${ price.toFixed( decimals ) } ${ PRICE_CONFIG.CURRENCY }`;
}

/**
 * Formatea una distancia en kilómetros
 * 
 * @param {number|string} distance - Distancia a formatear
 * @returns {string} Distancia formateada
 * 
 * @example
 * formatDistance(12.345) // "12.3 km"
 * formatDistance("5") // "5.0 km"
 */
export function formatDistance ( distance ) {
  const dist = parseFloat( distance );
  if ( isNaN( dist ) ) return '0 km';
  return `${ dist.toFixed( 1 ) } km`;
}

/**
 * Trunca un texto a un número máximo de caracteres
 * 
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado con "..." al final si excede
 * 
 * @example
 * truncateText("Este es un texto muy largo", 10) // "Este es un..."
 */
export function truncateText ( text, maxLength = 100 ) {
  if ( !text || text.length <= maxLength ) return text || '';
  return `${ text.substring( 0, maxLength ).trim() }...`;
}

/**
 * Formatea un número con separadores de miles
 * 
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado con separadores
 * 
 * @example
 * formatNumber(1234567) // "1.234.567"
 */
export function formatNumber ( num ) {
  if ( typeof num !== 'number' ) return '0';
  return num.toLocaleString( 'es-ES' );
}

// ============================================================================
// CÁLCULOS
// ============================================================================

/**
 * Calcula el porcentaje de descuento entre dos precios
 * 
 * @param {number} originalPrice - Precio original
 * @param {number} currentPrice - Precio actual con descuento
 * @returns {number} Porcentaje de descuento (0-100)
 * 
 * @example
 * calculateDiscount(100, 75) // 25
 */
export function calculateDiscount ( originalPrice, currentPrice ) {
  if ( !originalPrice || !currentPrice || originalPrice <= currentPrice ) return 0;
  return Math.round( ( ( originalPrice - currentPrice ) / originalPrice ) * 100 );
}

/**
 * Calcula la puntuación de relevancia de un producto
 * Combina múltiples factores para determinar la relevancia
 * 
 * @param {Object} product - Objeto producto
 * @returns {number} Puntuación de relevancia
 */
export function calculateRelevanceScore ( product ) {
  let score = 0;

  // Información adicional (popup) suma puntos
  if ( product.popupInfo ) score += 3;

  // Ofertas tienen alta relevancia
  if ( product.ofert ) score += 2.5;

  // Valoración convertida a puntos (0-2 puntos basado en estrellas)
  score += ( ( product.stars || 0 ) / 5 ) * 2;

  // Productos marcados como favoritos
  if ( product.like ) score += 1.5;

  return score;
}

/**
 * Calcula el porcentaje para un slider de rango
 * 
 * @param {number} value - Valor actual
 * @param {number} min - Valor mínimo del rango
 * @param {number} max - Valor máximo del rango
 * @returns {number} Porcentaje (0-100)
 * 
 * @example
 * calculateRangePercentage(50, 0, 100) // 50
 */
export function calculateRangePercentage ( value, min, max ) {
  if ( max === min ) return 0;
  return ( ( value - min ) / ( max - min ) ) * 100;
}

/**
 * Limita un valor entre un mínimo y máximo (clamp)
 * 
 * @param {number} value - Valor a limitar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Valor limitado
 * 
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-10, 0, 100) // 0
 */
export function clamp ( value, min, max ) {
  return Math.min( Math.max( value, min ), max );
}

/**
 * Obtiene el rango de precios de un array de productos
 * 
 * @param {Array} products - Array de productos
 * @returns {Object} { min: number, max: number }
 * 
 * @example
 * getPriceRange([{price: 10}, {price: 50}]) // {min: 10, max: 50}
 */
export function getPriceRange ( products ) {
  if ( !products || products.length === 0 )
  {
    return { min: PRICE_CONFIG.MIN_PRICE, max: PRICE_CONFIG.DEFAULT_MAX_PRICE };
  }

  const prices = products.map( p => p.price || 0 ).filter( p => p > 0 );

  if ( prices.length === 0 )
  {
    return { min: PRICE_CONFIG.MIN_PRICE, max: PRICE_CONFIG.DEFAULT_MAX_PRICE };
  }

  return {
    min: Math.floor( Math.min( ...prices ) ),
    max: Math.ceil( Math.max( ...prices ) )
  };
}

// ============================================================================
// VALIDACIÓN
// ============================================================================

/**
 * Valida si un email tiene formato correcto
 * 
 * @param {string} email - Email a validar
 * @returns {boolean} True si el email es válido
 * 
 * @example
 * isValidEmail("user@example.com") // true
 * isValidEmail("invalid-email") // false
 */
export function isValidEmail ( email ) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test( email );
}

/**
 * Valida una contraseña según criterios establecidos
 * 
 * @param {string} password - Contraseña a validar
 * @param {number} minLength - Longitud mínima (default: 8)
 * @returns {Object} { valid: boolean, errors: string[] }
 * 
 * @example
 * validatePassword("12345") // { valid: false, errors: [...] }
 * validatePassword("securepass123") // { valid: true, errors: [] }
 */
export function validatePassword ( password, minLength = 8 ) {
  const errors = [];

  if ( !password )
  {
    errors.push( 'La contraseña es requerida' );
    return { valid: false, errors };
  }

  if ( password.length < minLength )
  {
    errors.push( `La contraseña debe tener al menos ${ minLength } caracteres` );
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Compara dos contraseñas para verificar que coincidan
 * 
 * @param {string} password - Contraseña principal
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {boolean} True si las contraseñas coinciden
 */
export function passwordsMatch ( password, confirmPassword ) {
  return password === confirmPassword && password.length > 0;
}

// ============================================================================
// FILTRADO
// ============================================================================

/**
 * Filtra productos por término de búsqueda
 * Busca en nombre, descripción y productor
 * 
 * @param {Array} products - Array de productos
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Productos filtrados
 */
export function filterBySearch ( products, searchTerm ) {
  if ( !searchTerm || !searchTerm.trim() ) return products;

  const term = searchTerm.toLowerCase().trim();

  return products.filter( product =>
    ( product.name?.toLowerCase() || '' ).includes( term ) ||
    ( product.description?.toLowerCase() || '' ).includes( term ) ||
    ( product.productor?.toLowerCase() || '' ).includes( term )
  );
}

/**
 * Filtra productos por categorías seleccionadas
 * 
 * @param {Array} products - Array de productos
 * @param {Array} categoryTypes - Array de tipos de categorías
 * @returns {Array} Productos filtrados
 */
export function filterByCategory ( products, categoryTypes ) {
  if ( !categoryTypes || categoryTypes.length === 0 ) return products;

  return products.filter( product =>
    product.type && categoryTypes.includes( product.type )
  );
}

/**
 * Filtra productos por rango de precios
 * 
 * @param {Array} products - Array de productos
 * @param {Object} priceRange - { min: number, max: number }
 * @returns {Array} Productos filtrados
 */
export function filterByPriceRange ( products, priceRange ) {
  if ( !priceRange ) return products;

  const { min = 0, max = Infinity } = priceRange;

  return products.filter( product =>
    product.price >= min && product.price <= max
  );
}

/**
 * Filtra productores por distancia máxima
 * 
 * @param {Array} producers - Array de productores
 * @param {number} maxDistance - Distancia máxima en km
 * @returns {Array} Productores filtrados
 */
export function filterByDistance ( producers, maxDistance ) {
  if ( !maxDistance || maxDistance === Infinity ) return producers;

  return producers.filter( producer => {
    const distance = parseFloat( producer.distance || 0 );
    return distance <= maxDistance;
  } );
}

/**
 * Filtra productores por valoración mínima
 * 
 * @param {Array} producers - Array de productores
 * @param {number} minRating - Valoración mínima
 * @returns {Array} Productores filtrados
 */
export function filterByRating ( producers, minRating ) {
  if ( !minRating || minRating === 0 ) return producers;

  return producers.filter( producer => {
    const rating = parseFloat( producer.stars || 0 );
    return rating >= minRating;
  } );
}

// ============================================================================
// UTILIDADES DE STRING
// ============================================================================

/**
 * Genera un slug a partir de un texto
 * Convierte texto a formato URL-friendly
 * 
 * @param {string} text - Texto a convertir
 * @returns {string} Slug generado
 * 
 * @example
 * slugify("Hola Mundo!") // "hola-mundo"
 */
export function slugify ( text ) {
  if ( !text ) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace( /\s+/g, '-' )           // Espacios a guiones
    .replace( /[^\w\-]+/g, '' )       // Remover caracteres especiales
    .replace( /\-\-+/g, '-' )         // Múltiples guiones a uno solo
    .replace( /^-+/, '' )             // Remover guiones al inicio
    .replace( /-+$/, '' );            // Remover guiones al final
}

/**
 * Combina clases CSS de forma condicional
 * Útil para aplicar clases dinámicamente
 * 
 * @param {...any} classes - Clases a combinar
 * @returns {string} String con clases combinadas
 * 
 * @example
 * cn("base", true && "active", false && "disabled") // "base active"
 */
export function cn ( ...classes ) {
  return classes.filter( Boolean ).join( ' ' );
}

// ============================================================================
// UTILIDADES DE RENDIMIENTO
// ============================================================================

/**
 * Crea una función con debounce
 * Retrasa la ejecución hasta que pasen X milisegundos sin llamadas
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce aplicado
 */
export function debounce ( func, wait = 300 ) {
  let timeout;
  return function executedFunction ( ...args ) {
    const later = () => {
      clearTimeout( timeout );
      func( ...args );
    };
    clearTimeout( timeout );
    timeout = setTimeout( later, wait );
  };
}
