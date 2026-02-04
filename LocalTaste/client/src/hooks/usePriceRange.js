/**
 * HOOK DE RANGO DE PRECIOS
 * 
 * Hook especializado para manejar el filtrado por rango de precios.
 * Maneja tanto sliders como inputs numéricos de forma sincronizada.
 * 
 * Características:
 * - Cálculo automático del rango disponible basado en productos
 * - Sincronización entre sliders e inputs numéricos
 * - Validación de valores mínimo/máximo
 * - Formateo automático de valores
 * 
 * @module hooks/usePriceRange
 */

import { useState, useCallback, useMemo } from 'react';
import { getPriceRange, clamp } from '@/lib/utils';
import { PRICE_CONFIG } from '@/constants';

/**
 * Hook para manejar el rango de precios de filtrado
 * 
 * @param {Array} productsData - Array de productos
 * @returns {Object} Estado y funciones del rango de precios
 * 
 * @example
 * const {
 *   minPrice,
 *   maxPrice,
 *   handleMinPriceChange,
 *   priceRange
 * } = usePriceRange(products);
 */
export function usePriceRange ( productsData = [] ) {
  // ========================================================================
  // CÁLCULO DEL RANGO DISPONIBLE
  // ========================================================================

  /**
   * Calcula el rango de precios basado en los productos disponibles
   * Se recalcula cuando cambia el array de productos
   */
  const priceRange = useMemo( () => getPriceRange( productsData ), [ productsData ] );

  // ========================================================================
  // ESTADO
  // ========================================================================

  // Precios actuales seleccionados (números)
  const [ minPrice, setMinPrice ] = useState( priceRange.min );
  const [ maxPrice, setMaxPrice ] = useState( priceRange.max );

  // Valores mostrados en los inputs (strings formateados)
  const [ minInputValue, setMinInputValue ] = useState( priceRange.min.toFixed( PRICE_CONFIG.DECIMALS ) );
  const [ maxInputValue, setMaxInputValue ] = useState( priceRange.max.toFixed( PRICE_CONFIG.DECIMALS ) );

  // ========================================================================
  // FUNCIONES DE UTILIDAD
  // ========================================================================

  /**
   * Actualiza todos los valores al rango calculado
   * Útil cuando cambian los productos filtrados
   */
  const updatePriceRange = useCallback( () => {
    const newRange = getPriceRange( productsData );
    setMinPrice( newRange.min );
    setMaxPrice( newRange.max );
    setMinInputValue( newRange.min.toFixed( PRICE_CONFIG.DECIMALS ) );
    setMaxInputValue( newRange.max.toFixed( PRICE_CONFIG.DECIMALS ) );
  }, [ productsData ] );

  /**
   * Resetea el rango a los valores iniciales
   */
  const resetPriceRange = useCallback( () => {
    setMinPrice( priceRange.min );
    setMaxPrice( priceRange.max );
    setMinInputValue( priceRange.min.toFixed( PRICE_CONFIG.DECIMALS ) );
    setMaxInputValue( priceRange.max.toFixed( PRICE_CONFIG.DECIMALS ) );
  }, [ priceRange ] );

  // ========================================================================
  // HANDLERS PARA PRECIO MÍNIMO
  // ========================================================================

  /**
   * Maneja cambios en el input de precio mínimo
   * Actualiza el valor visual inmediatamente y valida
   */
  const handleMinPriceChange = useCallback( ( e ) => {
    const inputValue = e.target.value;
    setMinInputValue( inputValue );

    // Solo actualizar el precio si es un número válido
    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      // Asegurar que el mínimo no sea mayor que el máximo
      const newMin = clamp( value, priceRange.min, maxPrice - 0.01 );
      setMinPrice( newMin );
    }
  }, [ maxPrice, priceRange.min ] );

  /**
   * Maneja cuando el input de precio mínimo pierde el foco
   * Formatea y valida el valor final
   */
  const handleMinPriceBlur = useCallback( () => {
    if ( minInputValue === '' || isNaN( minInputValue ) )
    {
      // Si el valor no es válido, revertir al último válido
      setMinInputValue( minPrice.toFixed( PRICE_CONFIG.DECIMALS ) );
    } else
    {
      const value = parseFloat( minInputValue );
      const newMin = clamp( value, priceRange.min, maxPrice - 0.01 );
      setMinPrice( newMin );
      setMinInputValue( newMin.toFixed( PRICE_CONFIG.DECIMALS ) );
    }
  }, [ minInputValue, minPrice, maxPrice, priceRange.min ] );

  // ========================================================================
  // HANDLERS PARA PRECIO MÁXIMO
  // ========================================================================

  /**
   * Maneja cambios en el input de precio máximo
   */
  const handleMaxPriceChange = useCallback( ( e ) => {
    const inputValue = e.target.value;
    setMaxInputValue( inputValue );

    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      // Asegurar que el máximo no sea menor que el mínimo
      const newMax = clamp( value, minPrice + 0.01, priceRange.max );
      setMaxPrice( newMax );
    }
  }, [ minPrice, priceRange.max ] );

  /**
   * Maneja cuando el input de precio máximo pierde el foco
   */
  const handleMaxPriceBlur = useCallback( () => {
    if ( maxInputValue === '' || isNaN( maxInputValue ) )
    {
      setMaxInputValue( maxPrice.toFixed( PRICE_CONFIG.DECIMALS ) );
    } else
    {
      const value = parseFloat( maxInputValue );
      const newMax = clamp( value, minPrice + 0.01, priceRange.max );
      setMaxPrice( newMax );
      setMaxInputValue( newMax.toFixed( PRICE_CONFIG.DECIMALS ) );
    }
  }, [ maxInputValue, maxPrice, minPrice, priceRange.max ] );

  // ========================================================================
  // HANDLERS PARA SLIDERS
  // ========================================================================

  /**
   * Maneja cambios en los sliders de rango
   * @param {Event} e - Evento del slider
   * @param {string} type - 'min' o 'max'
   */
  const handleRangeSliderChange = useCallback( ( e, type ) => {
    const value = parseFloat( e.target.value );

    if ( type === 'min' )
    {
      const newMin = Math.min( value, maxPrice - 0.01 );
      setMinPrice( newMin );
      setMinInputValue( newMin.toFixed( PRICE_CONFIG.DECIMALS ) );
    } else
    {
      const newMax = Math.max( value, minPrice + 0.01 );
      setMaxPrice( newMax );
      setMaxInputValue( newMax.toFixed( PRICE_CONFIG.DECIMALS ) );
    }
  }, [ minPrice, maxPrice ] );

  // ========================================================================
  // RETORNO
  // ========================================================================

  return {
    // Valores actuales
    minPrice,
    maxPrice,
    minInputValue,
    maxInputValue,
    priceRange,

    // Handlers de inputs
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,

    // Handlers de sliders
    handleRangeSliderChange,

    // Utilidades
    resetPriceRange,
    updatePriceRange
  };
}
