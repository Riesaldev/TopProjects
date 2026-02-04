/**
 * HOOK DE FILTRADO POR CATEGORÍAS
 * 
 * Hook especializado para manejar el filtrado por categorías de productos.
 * Permite seleccionar/deseleccionar categorías y contar productos por categoría.
 * 
 * Características:
 * - Toggle de categorías individuales
 * - Limpieza de todas las categorías
 * - Conteo de productos por categoría
 * - Notificación automática al padre cuando cambian las selecciones
 * 
 * @module hooks/useCategoryFilter
 */

import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook para manejar el filtrado por categorías
 * 
 * @param {Object} categoryMapping - Mapeo de categorías a tipos de productos
 *   Ejemplo: { 'Frutas y Verduras': ['Fruta', 'Verdura'] }
 * @param {Array} productsData - Array de productos para contar
 * @param {Function} onCategoryChange - Callback cuando cambian las categorías
 * @returns {Object} Estado y funciones del filtro de categorías
 * 
 * @example
 * const { selectedCategories, handleCategoryToggle } = useCategoryFilter(
 *   categoryMapping,
 *   products,
 *   (types) => console.log('Tipos seleccionados:', types)
 * );
 */
export function useCategoryFilter ( categoryMapping, productsData = [], onCategoryChange ) {
  // ========================================================================
  // ESTADO
  // ========================================================================

  // Array con nombres de categorías seleccionadas
  const [ selectedCategories, setSelectedCategories ] = useState( [] );

  // ========================================================================
  // REFS PARA EVITAR RE-RENDERS INNECESARIOS
  // ========================================================================

  // Mantener referencias estables de props que cambian frecuentemente
  const onCategoryChangeRef = useRef( onCategoryChange );
  const categoryMappingRef = useRef( categoryMapping );

  /**
   * Actualizar refs cuando cambien las props
   * Evita que useEffect se dispare innecesariamente
   */
  useEffect( () => {
    onCategoryChangeRef.current = onCategoryChange;
    categoryMappingRef.current = categoryMapping;
  }, [ onCategoryChange, categoryMapping ] );

  // ========================================================================
  // FUNCIONES DE UTILIDAD
  // ========================================================================

  /**
   * Cuenta cuántos productos pertenecen a una categoría
   * 
   * @param {Array} categoryTypes - Array de tipos de la categoría
   * @returns {number} Número de productos en esos tipos
   */
  const getCategoryCount = useCallback( ( categoryTypes ) => {
    return productsData.filter( product =>
      categoryTypes.includes( product.type )
    ).length;
  }, [ productsData ] );

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Alterna la selección de una categoría
   * Si está seleccionada, la deselecciona. Si no, la selecciona.
   * 
   * @param {string} category - Nombre de la categoría
   */
  const handleCategoryToggle = useCallback( ( category ) => {
    setSelectedCategories( prev =>
      prev.includes( category )
        ? prev.filter( cat => cat !== category )  // Remover si existe
        : [ ...prev, category ]                    // Agregar si no existe
    );
  }, [] );

  /**
   * Limpia todas las categorías seleccionadas
   */
  const handleClearAll = useCallback( () => {
    setSelectedCategories( [] );
  }, [] );

  // ========================================================================
  // EFECTOS
  // ========================================================================

  /**
   * Notifica al componente padre cuando cambian las categorías seleccionadas
   * Convierte nombres de categorías a array de tipos de productos
   */
  useEffect( () => {
    if ( onCategoryChangeRef.current )
    {
      // Convertir categorías seleccionadas a tipos de productos
      const selectedTypes = selectedCategories.flatMap(
        category => categoryMappingRef.current[ category ] || []
      );
      onCategoryChangeRef.current( selectedTypes );
    }
  }, [ selectedCategories ] );

  // ========================================================================
  // RETORNO
  // ========================================================================

  return {
    // Estado
    selectedCategories,

    // Handlers
    handleCategoryToggle,
    handleClearAll,

    // Utilidades
    getCategoryCount
  };
}
