/**
 * HOOK GENÉRICO DE ORDENAMIENTO
 * 
 * Este hook proporciona funcionalidad de ordenamiento reutilizable
 * para cualquier tipo de datos.
 * 
 * Características:
 * - Soporte para múltiples criterios de ordenamiento
 * - Funciones de ordenamiento personalizables
 * - Memoización para optimizar rendimiento
 * 
 * @module hooks/useSort
 */

import { useState, useMemo, useCallback } from 'react';

/**
 * Hook genérico para ordenar datos
 * 
 * @param {Array} data - Array de datos a ordenar
 * @param {Object} sortFunctions - Objeto con funciones de ordenamiento
 *   Las claves son los nombres de las opciones, los valores son funciones (a, b) => number
 * @param {string} defaultSort - Opción de ordenamiento por defecto
 * @returns {Object} Estado y funciones de ordenamiento
 * 
 * @example
 * const sortFns = {
 *   'nombre': (a, b) => a.name.localeCompare(b.name),
 *   'precio': (a, b) => a.price - b.price
 * };
 * const { sortedData, handleSortChange } = useSort(data, sortFns, 'nombre');
 */
export function useSort ( data = [], sortFunctions = {}, defaultSort = 'relevancia' ) {
  // ========================================================================
  // ESTADO
  // ========================================================================

  // Opción de ordenamiento actual
  const [ sortOption, setSortOption ] = useState( defaultSort );

  // ========================================================================
  // ORDENAMIENTO DE DATOS
  // ========================================================================

  /**
   * Aplica el ordenamiento seleccionado a los datos
   * Se recalcula cuando cambian los datos o la opción de ordenamiento
   */
  const sortedData = useMemo( () => {
    // Si es la opción por defecto (relevancia) o no existe función, devolver sin ordenar
    if ( !sortOption || sortOption === 'relevancia' || !sortFunctions[ sortOption ] )
    {
      return data;
    }

    // Obtener la función de ordenamiento correspondiente
    const sortFn = sortFunctions[ sortOption ];

    // Crear copia del array y ordenar
    return [ ...data ].sort( sortFn );
  }, [ data, sortOption, sortFunctions ] );

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Cambia la opción de ordenamiento actual
   * @param {string} newOption - Nueva opción de ordenamiento
   */
  const handleSortChange = useCallback( ( newOption ) => {
    setSortOption( newOption );
  }, [] );

  /**
   * Resetea al ordenamiento por defecto
   */
  const resetSort = useCallback( () => {
    setSortOption( defaultSort );
  }, [ defaultSort ] );

  // ========================================================================
  // RETORNO DEL HOOK
  // ========================================================================

  return {
    // Opción de ordenamiento actual
    sortOption,

    // Datos ordenados
    sortedData,

    // Handlers
    handleSortChange,
    resetSort,

    // Setter directo
    setSortOption
  };
}
