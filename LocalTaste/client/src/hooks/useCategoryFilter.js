import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook para manejar el filtrado por categorías
 * @param {Object} categoryMapping - Mapeo de categorías a tipos de productos
 * @param {Array} productsData - Array de productos
 * @param {Function} onCategoryChange - Callback cuando cambian las categorías
 * @returns {Object} Estado y funciones del filtro de categorías
 */
export function useCategoryFilter ( categoryMapping, productsData = [], onCategoryChange ) {
  const [ selectedCategories, setSelectedCategories ] = useState( [] );
  const onCategoryChangeRef = useRef( onCategoryChange );
  const categoryMappingRef = useRef( categoryMapping );

  // Actualizar refs en cada render
  useEffect( () => {
    onCategoryChangeRef.current = onCategoryChange;
    categoryMappingRef.current = categoryMapping;
  }, [] );

  const getCategoryCount = useCallback( ( categoryTypes ) => {
    return productsData.filter( product =>
      categoryTypes.includes( product.type )
    ).length;
  }, [ productsData ] );

  const handleCategoryToggle = useCallback( ( category ) => {
    setSelectedCategories( prev =>
      prev.includes( category )
        ? prev.filter( cat => cat !== category )
        : [ ...prev, category ]
    );
  }, [] );

  const handleClearAll = useCallback( () => {
    setSelectedCategories( [] );
  }, [] );

  // Solo depende de selectedCategories
  useEffect( () => {
    if ( onCategoryChangeRef.current )
    {
      const selectedTypes = selectedCategories.flatMap(
        category => categoryMappingRef.current[ category ] || []
      );
      onCategoryChangeRef.current( selectedTypes );
    }
  }, [ selectedCategories ] ); // ← Solo esta dependencia

  return {
    selectedCategories,
    handleCategoryToggle,
    handleClearAll,
    getCategoryCount
  };
}
