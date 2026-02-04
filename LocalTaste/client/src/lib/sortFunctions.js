/**
 * FUNCIONES DE ORDENAMIENTO
 * 
 * Este archivo contiene todas las funciones de ordenamiento utilizadas
 * en la aplicación para productos y productores.
 * 
 * Cada función recibe dos elementos (a, b) y devuelve:
 * - Negativo si a debe ir antes que b
 * - Positivo si b debe ir antes que a
 * - 0 si son iguales
 * 
 * @module sortFunctions
 */

import { calculateRelevanceScore } from './utils';

// ============================================================================
// FUNCIONES DE ORDENAMIENTO PARA PRODUCTOS
// ============================================================================

/**
 * Objeto con todas las funciones de ordenamiento para productos
 * Cada clave corresponde a una opción de ordenamiento
 */
export const productSortFunctions = {
  /**
   * Ordena por mejor valoración (mayor a menor)
   */
  'mejor-valorados': ( a, b ) => ( b.stars || 0 ) - ( a.stars || 0 ),

  /**
   * Ordena por frescura del producto
   * Prioriza productos recién cosechados y ediciones limitadas
   */
  'recien-cosechado': ( a, b ) => {
    const getFreshnessScore = ( product ) => {
      if ( !product.popupInfo ) return 0;
      const info = product.popupInfo.toLowerCase();

      // Puntuación basada en palabras clave
      if ( info.includes( 'cosechad' ) ) return 3;
      if ( info.includes( 'edición limitada' ) ) return 2;
      return 1;
    };

    const scoreA = getFreshnessScore( a );
    const scoreB = getFreshnessScore( b );

    // Si tienen la misma frescura, ordenar por valoración
    if ( scoreB === scoreA )
    {
      return ( b.stars || 0 ) - ( a.stars || 0 );
    }
    return scoreB - scoreA;
  },

  /**
   * Ordena por ofertas
   * Prioriza productos en oferta con mayor descuento
   */
  'ofertas': ( a, b ) => {
    // Productos en oferta primero
    if ( a.ofert && !b.ofert ) return -1;
    if ( !a.ofert && b.ofert ) return 1;

    // Si ambos están en oferta, ordenar por porcentaje de descuento
    if ( a.ofert && b.ofert )
    {
      const discountA = a.before ? ( ( a.before - a.price ) / a.before ) * 100 : 0;
      const discountB = b.before ? ( ( b.before - b.price ) / b.before ) * 100 : 0;
      return discountB - discountA;
    }

    // Si ninguno está en oferta, ordenar por valoración
    return ( b.stars || 0 ) - ( a.stars || 0 );
  },

  /**
   * Ordena por popularidad (productos con "like" primero)
   */
  'popularidad': ( a, b ) => {
    // Productos marcados como favoritos primero
    if ( a.like && !b.like ) return -1;
    if ( !a.like && b.like ) return 1;

    // Si ambos tienen el mismo estado de like, ordenar por valoración
    return ( b.stars || 0 ) - ( a.stars || 0 );
  },

  /**
   * Ordena por precio ascendente (menor a mayor)
   */
  'precio-asc': ( a, b ) => ( a.price || 0 ) - ( b.price || 0 ),

  /**
   * Ordena por precio descendente (mayor a menor)
   */
  'precio-desc': ( a, b ) => ( b.price || 0 ) - ( a.price || 0 ),

  /**
   * Ordena alfabéticamente por nombre (A-Z)
   */
  'alfabetico': ( a, b ) => ( a.name || '' ).localeCompare( b.name || '', 'es' ),

  /**
   * Ordena por relevancia calculada
   * Combina múltiples factores: popup info, ofertas, valoraciones, likes
   */
  'relevancia': ( a, b ) => calculateRelevanceScore( b ) - calculateRelevanceScore( a )
};

// ============================================================================
// FUNCIONES DE ORDENAMIENTO PARA PRODUCTORES
// ============================================================================

/**
 * Objeto con todas las funciones de ordenamiento para productores
 */
export const producerSortFunctions = {
  /**
   * Ordena por mejor valoración (mayor a menor)
   */
  'mejor-valorados': ( a, b ) => ( b.stars || 0 ) - ( a.stars || 0 ),

  /**
   * Ordena por distancia ascendente (más cercanos primero)
   */
  'mas-cercanos': ( a, b ) => {
    const distA = parseFloat( a.distance || 999 );
    const distB = parseFloat( b.distance || 999 );
    return distA - distB;
  },

  /**
   * Ordena por distancia descendente (más lejanos primero)
   */
  'mas-lejanos': ( a, b ) => {
    const distA = parseFloat( a.distance || 0 );
    const distB = parseFloat( b.distance || 0 );
    return distB - distA;
  },

  /**
   * Ordena por popularidad (con "like" primero)
   */
  'popularidad': ( a, b ) => {
    const aLikes = a.like ? 1 : 0;
    const bLikes = b.like ? 1 : 0;
    return bLikes - aLikes;
  },

  /**
   * Ordena por ID descendente (más nuevos primero)
   */
  'nuevos': ( a, b ) => b.id - a.id,

  /**
   * Ordena alfabéticamente por nombre (A-Z)
   */
  'alfabetico': ( a, b ) => ( a.name || '' ).localeCompare( b.name || '', 'es' )
};

/**
 * Obtiene la función de ordenamiento adecuada según el tipo y opción
 * 
 * @param {string} type - Tipo de dato ('products' o 'producers')
 * @param {string} sortOption - Opción de ordenamiento seleccionada
 * @returns {Function|null} Función de ordenamiento o null si no existe
 */
export function getSortFunction ( type, sortOption ) {
  if ( type === 'products' )
  {
    return productSortFunctions[ sortOption ] || null;
  }

  if ( type === 'producers' )
  {
    return producerSortFunctions[ sortOption ] || null;
  }

  return null;
}
