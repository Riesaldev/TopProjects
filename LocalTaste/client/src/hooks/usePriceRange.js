import { useState, useCallback, useMemo } from 'react';

/**
 * Hook para manejar el rango de precios de filtrado
 * @param {Array} productsData - Array de productos
 * @returns {Object} Estado y funciones del rango de precios
 */
export function usePriceRange ( productsData = [] ) {
  // Calcular el rango de precios de los productos
  const calculatePriceRange = useCallback( () => {
    if ( productsData.length === 0 )
    {
      return { min: 0, max: 100 };
    }

    const prices = productsData.map( product => product.price );
    return {
      min: Math.floor( Math.min( ...prices ) ),
      max: Math.ceil( Math.max( ...prices ) )
    };
  }, [ productsData ] );

  const priceRange = useMemo( () => calculatePriceRange(), [ calculatePriceRange ] );

  const [ minPrice, setMinPrice ] = useState( priceRange.min );
  const [ maxPrice, setMaxPrice ] = useState( priceRange.max );
  const [ minInputValue, setMinInputValue ] = useState( priceRange.min.toFixed( 2 ) );
  const [ maxInputValue, setMaxInputValue ] = useState( priceRange.max.toFixed( 2 ) );

  // Actualizar valores cuando cambien los productos
  const updatePriceRange = useCallback( () => {
    const newRange = calculatePriceRange();
    setMinPrice( newRange.min );
    setMaxPrice( newRange.max );
    setMinInputValue( newRange.min.toFixed( 2 ) );
    setMaxInputValue( newRange.max.toFixed( 2 ) );
  }, [ calculatePriceRange ] );

  const handleMinPriceChange = useCallback( ( e ) => {
    const inputValue = e.target.value;
    setMinInputValue( inputValue );

    // Solo actualizar el precio si es un número válido
    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      const newMin = Math.max( priceRange.min, Math.min( value, maxPrice - 0.01 ) );
      setMinPrice( newMin );
    }
  }, [ maxPrice, priceRange.min ] );

  const handleMinPriceBlur = useCallback( () => {
    // Al perder el foco, validar y formatear
    if ( minInputValue === '' || isNaN( minInputValue ) )
    {
      setMinInputValue( minPrice.toFixed( 2 ) );
    } else
    {
      const value = parseFloat( minInputValue );
      const newMin = Math.max( priceRange.min, Math.min( value, maxPrice - 0.01 ) );
      setMinPrice( newMin );
      setMinInputValue( newMin.toFixed( 2 ) );
    }
  }, [ minInputValue, minPrice, maxPrice, priceRange.min ] );

  const handleMaxPriceChange = useCallback( ( e ) => {
    const inputValue = e.target.value;
    setMaxInputValue( inputValue );

    // Solo actualizar el precio si es un número válido
    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      const newMax = Math.min( priceRange.max, Math.max( value, minPrice + 0.01 ) );
      setMaxPrice( newMax );
    }
  }, [ minPrice, priceRange.max ] );

  const handleMaxPriceBlur = useCallback( () => {
    // Al perder el foco, validar y formatear
    if ( maxInputValue === '' || isNaN( maxInputValue ) )
    {
      setMaxInputValue( maxPrice.toFixed( 2 ) );
    } else
    {
      const value = parseFloat( maxInputValue );
      const newMax = Math.min( priceRange.max, Math.max( value, minPrice + 0.01 ) );
      setMaxPrice( newMax );
      setMaxInputValue( newMax.toFixed( 2 ) );
    }
  }, [ maxInputValue, maxPrice, minPrice, priceRange.max ] );

  const handleRangeSliderChange = useCallback( ( e, type ) => {
    const value = parseFloat( e.target.value );

    if ( type === 'min' )
    {
      const newMin = Math.min( value, maxPrice - 0.01 );
      setMinPrice( newMin );
      setMinInputValue( newMin.toFixed( 2 ) );
    } else
    {
      const newMax = Math.max( value, minPrice + 0.01 );
      setMaxPrice( newMax );
      setMaxInputValue( newMax.toFixed( 2 ) );
    }
  }, [ minPrice, maxPrice ] );

  const resetPriceRange = useCallback( () => {
    setMinPrice( priceRange.min );
    setMaxPrice( priceRange.max );
    setMinInputValue( priceRange.min.toFixed( 2 ) );
    setMaxInputValue( priceRange.max.toFixed( 2 ) );
  }, [ priceRange ] );

  return {
    minPrice,
    maxPrice,
    minInputValue,
    maxInputValue,
    priceRange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    handleRangeSliderChange,
    resetPriceRange,
    updatePriceRange
  };
}
