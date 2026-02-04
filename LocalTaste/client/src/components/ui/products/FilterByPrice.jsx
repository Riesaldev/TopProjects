"use client";

import { useEffect } from 'react';
import { usePriceRange } from '@/hooks/usePriceRange';

/**
 * @fileoverview Componente de filtro por rango de precios
 * Implementa un slider dual para seleccionar rango mínimo y máximo de precio
 */

/**
 * Filtro de productos por rango de precios
 * 
 * Proporciona inputs numéricos y sliders duales para seleccionar un rango de precios.
 * Los valores se actualizan automáticamente basados en los productos disponibles.
 * Incluye debouncing (300ms) para evitar notificaciones excesivas al padre.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onPriceRangeChange - Callback ejecutado cuando cambia el rango de precios
 * @param {Array} props.productsData - Array de productos para calcular el rango de precios disponible
 * 
 * @example
 * <FilterByPrice 
 *   onPriceRangeChange={({min, max}) => console.log(`Precio: €${min} - €${max}`)}
 *   productsData={products}
 * />
 */
export default function FilterByPrice ( { onPriceRangeChange, productsData = [] } ) {
  const {
    minPrice,
    maxPrice,
    minInputValue,
    maxInputValue,
    priceRange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    updatePriceRange
  } = usePriceRange( productsData );

  /**
   * Efecto para actualizar el rango de precios cuando cambian los productos disponibles
   * Recalcula min/max automáticamente según el nuevo conjunto de productos
   */
  useEffect( () => {
    updatePriceRange();
  }, [ productsData, updatePriceRange ] );

  /**
   * Efecto de debouncing para notificar cambios de precio
   * Espera 300ms después del último cambio antes de notificar al padre
   * Esto evita actualizaciones excesivas mientras el usuario arrastra los sliders
   */
  useEffect( () => {
    const timer = setTimeout( () => {
      if ( onPriceRangeChange )
      {
        onPriceRangeChange( { min: minPrice, max: maxPrice } );
      }
    }, 300 );

    return () => clearTimeout( timer );
  }, [ minPrice, maxPrice, onPriceRangeChange ] );

  const handleMinSliderChange = ( e ) => {
    handleMinPriceChange( e );
  };

  const handleMaxSliderChange = ( e ) => {
    handleMaxPriceChange( e );
  };

  /**
   * Calcula el porcentaje de posición de un valor dentro del rango
   * Usado para posicionar visualmente el rango activo en los sliders
   * 
   * @param {number} value - Valor del que calcular el porcentaje
   * @returns {number} Porcentaje (0-100) de la posición del valor en el rango
   */
  const getPercent = ( value ) => {
    return ( ( value - priceRange.min ) / ( priceRange.max - priceRange.min ) ) * 100;
  };

  return (
    <>
      {/* Price Filter */}
      <div className="p-5 rounded-2xl border border-green-300 bg-green-50 brightness-105">
        <h3 className="text-base font-bold mb-4">Rango de Precio</h3>

        {/* Inputs de precio */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-gray-600">€</span>
            <input
              className="w-full h-9 pl-6 pr-2 rounded-lg border border-green-300 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              type="number"
              min={priceRange.min}
              max={maxPrice}
              step="0.50"
              value={minInputValue}
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceBlur}
              placeholder="Mín"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-gray-600">€</span>
            <input
              className="w-full h-9 pl-6 pr-2 rounded-lg border border-green-300 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              type="number"
              min={minPrice}
              max={priceRange.max}
              step="0.50"
              value={maxInputValue}
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceBlur}
              placeholder="Máx"
            />
          </div>
        </div>

        {/* Contenedor de sliders dual */}
        <div className="relative h-1 mb-8">
          {/* Pista de fondo */}
          <div className="absolute w-full h-1 bg-green-200 rounded-lg"></div>

          {/* Rango activo */}
          <div
            className="absolute h-1 bg-green-600 rounded-lg"
            style={{
              left: `${ getPercent( minPrice ) }%`,
              right: `${ 100 - getPercent( maxPrice ) }%`
            }}
          ></div>

          {/* Slider mínimo */}
          <input
            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step="0.01"
            value={minPrice}
            onChange={handleMinSliderChange}
          />

          {/* Slider máximo */}
          <input
            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step="0.01"
            value={maxPrice}
            onChange={handleMaxSliderChange}
          />
        </div>
      </div>
    </>
  );
}