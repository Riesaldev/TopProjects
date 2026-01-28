import { useCallback, useRef } from 'react';

/**
 * Hook para debouncing - retrasa la ejecución de un callback
 * @param {Function} callback - Función a ejecutar después del delay
 * @param {number} delay - Tiempo de espera en milisegundos (default: 300)
 * @returns {Function} Función debounced
 */
export function useDebounce ( callback, delay = 300 ) {
  const timeoutRef = useRef( null );

  return useCallback( ( ...args ) => {
    if ( timeoutRef.current )
    {
      clearTimeout( timeoutRef.current );
    }

    timeoutRef.current = setTimeout( () => {
      callback( ...args );
    }, delay );
  }, [ callback, delay ] );
}
