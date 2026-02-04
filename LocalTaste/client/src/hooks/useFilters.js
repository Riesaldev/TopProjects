/**
 * HOOK GENÉRICO DE FILTRADO
 * 
 * Este hook proporciona una solución centralizada y reutilizable para filtrar
 * cualquier tipo de datos (productos, productores, etc.).
 * 
 * Características:
 * - Filtrado por búsqueda de texto
 * - Filtrado por categorías
 * - Filtrado por rango de precios
 * - Soporte para filtros personalizados
 * - Detección automática de filtros activos
 * 
 * @module hooks/useFilters
 */

import { useState, useMemo, useCallback } from 'react';
import { filterBySearch, filterByCategory, filterByPriceRange } from '@/lib/utils';

/**
 * Hook genérico para manejar filtros de datos
 * 
 * @param {Array} data - Array de datos a filtrar
 * @param {Object} options - Configuración del hook
 * @param {boolean} options.enableSearch - Habilitar filtro por búsqueda
 * @param {boolean} options.enableCategory - Habilitar filtro por categoría
 * @param {boolean} options.enablePriceRange - Habilitar filtro por precio
 * @param {Object} options.customFilters - Objeto con filtros personalizados
 * @returns {Object} Estado y funciones de filtrado
 * 
 * @example
 * const { filteredData, handleSearchChange } = useFilters(products, {
 *   enableSearch: true,
 *   enableCategory: true
 * });
 */
export function useFilters ( data = [], options = {} ) {
  const {
    enableSearch = true,
    enableCategory = true,
    enablePriceRange = true,
    customFilters = {}
  } = options;

  // ========================================================================
  // ESTADO DE FILTROS
  // ========================================================================

  // Término de búsqueda actual
  const [ searchTerm, setSearchTerm ] = useState( '' );

  // Categorías seleccionadas (array de tipos)
  const [ selectedCategories, setSelectedCategories ] = useState( [] );

  // Rango de precios actual
  const [ priceRange, setPriceRange ] = useState( { min: 0, max: Infinity } );

  // Valores de filtros personalizados
  const [ customFilterValues, setCustomFilterValues ] = useState( {} );

  // ========================================================================
  // APLICACIÓN DE FILTROS
  // ========================================================================

  /**
   * Aplica todos los filtros habilitados a los datos
   * Se recalcula cuando cambian los datos o cualquier filtro
   */
  const filteredData = useMemo( () => {
    let result = [ ...data ];

    // Aplicar filtro de búsqueda si está habilitado
    if ( enableSearch && searchTerm )
    {
      result = filterBySearch( result, searchTerm );
    }

    // Aplicar filtro de categoría si está habilitado
    if ( enableCategory && selectedCategories.length > 0 )
    {
      result = filterByCategory( result, selectedCategories );
    }

    // Aplicar filtro de precio si está habilitado
    if ( enablePriceRange && ( priceRange.min > 0 || priceRange.max < Infinity ) )
    {
      result = filterByPriceRange( result, priceRange );
    }

    // Aplicar filtros personalizados
    Object.entries( customFilterValues ).forEach( ( [ key, value ] ) => {
      const filterFn = customFilters[ key ];
      if ( filterFn && value !== null && value !== undefined )
      {
        result = filterFn( result, value );
      }
    } );

    return result;
  }, [ data, searchTerm, selectedCategories, priceRange, customFilterValues, enableSearch, enableCategory, enablePriceRange, customFilters ] );

  // ========================================================================
  // HANDLERS DE FILTROS
  // ========================================================================

  /**
   * Actualiza el término de búsqueda
   * @param {string} term - Nuevo término de búsqueda
   */
  const handleSearchChange = useCallback( ( term ) => {
    setSearchTerm( term );
  }, [] );

  /**
   * Actualiza las categorías seleccionadas
   * @param {Array} categories - Array de tipos de categorías
   */
  const handleCategoryChange = useCallback( ( categories ) => {
    setSelectedCategories( categories );
  }, [] );

  /**
   * Actualiza el rango de precios
   * @param {Object} range - { min: number, max: number }
   */
  const handlePriceRangeChange = useCallback( ( range ) => {
    setPriceRange( range );
  }, [] );

  /**
   * Actualiza un filtro personalizado específico
   * @param {string} filterKey - Clave del filtro
   * @param {any} value - Nuevo valor del filtro
   */
  const handleCustomFilterChange = useCallback( ( filterKey, value ) => {
    setCustomFilterValues( prev => ( {
      ...prev,
      [ filterKey ]: value
    } ) );
  }, [] );

  /**
   * Resetea todos los filtros a sus valores por defecto
   */
  const resetFilters = useCallback( () => {
    setSearchTerm( '' );
    setSelectedCategories( [] );
    setPriceRange( { min: 0, max: Infinity } );
    setCustomFilterValues( {} );
  }, [] );

  // ========================================================================
  // UTILIDADES
  // ========================================================================

  /**
   * Indica si hay algún filtro activo
   */
  const hasActiveFilters = useMemo( () => {
    return searchTerm.trim() !== '' ||
      selectedCategories.length > 0 ||
      priceRange.min > 0 ||
      priceRange.max < Infinity ||
      Object.keys( customFilterValues ).length > 0;
  }, [ searchTerm, selectedCategories, priceRange, customFilterValues ] );

  // ========================================================================
  // RETORNO DEL HOOK
  // ========================================================================

  return {
    // Datos filtrados
    filteredData,

    // Estado actual de filtros
    searchTerm,
    selectedCategories,
    priceRange,
    customFilterValues,
    hasActiveFilters,

    // Handlers para modificar filtros
    handleSearchChange,
    handleCategoryChange,
    handlePriceRangeChange,
    handleCustomFilterChange,
    resetFilters,

    // Setters directos (para casos especiales)
    setSearchTerm,
    setSelectedCategories,
    setPriceRange,
    setCustomFilterValues
  };
}
