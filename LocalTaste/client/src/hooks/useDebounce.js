/**
 * HOOK DE DEBOUNCE
 * 
 * Hook para aplicar debounce a funciones, retrasando su ejecución
 * hasta que hayan pasado X milisegundos sin nuevas llamadas.
 * 
 * Útil para:
 * - Búsquedas en tiempo real (evitar llamadas excesivas a API)
 * - Validación de formularios
 * - Actualización de filtros
 * - Resize/scroll handlers
 * 
 * @module hooks/useDebounce
 */

import { useCallback, useRef } from 'react';

/**
 * Hook para debouncing - retrasa la ejecución de un callback
 * 
 * @param {Function} callback - Función a ejecutar después del delay
 * @param {number} delay - Tiempo de espera en milisegundos (default: 300)
 * @returns {Function} Función con debounce aplicado
 * 
 * @example
 * const debouncedSearch = useDebounce((searchTerm) => {
 *   // Llamada a API
 *   fetchResults(searchTerm);
 * }, 500);
 * 
 * <input onChange={(e) => debouncedSearch(e.target.value)} />
 */
export function useDebounce ( callback, delay = 300 ) {
  // ========================================================================
  // REF PARA TIMEOUT
  // ========================================================================

  // Mantener referencia al timeout actual
  const timeoutRef = useRef( null );

  // ========================================================================
  // FUNCIÓN DEBOUNCED
  // ========================================================================

  /**
   * Función con debounce aplicado
   * Cancela el timeout anterior y crea uno nuevo cada vez que se llama
   */
  return useCallback( ( ...args ) => {
    // Limpiar timeout anterior si existe
    if ( timeoutRef.current )
    {
      clearTimeout( timeoutRef.current );
    }

    // Crear nuevo timeout
    timeoutRef.current = setTimeout( () => {
      callback( ...args );
    }, delay );
  }, [ callback, delay ] );
}
