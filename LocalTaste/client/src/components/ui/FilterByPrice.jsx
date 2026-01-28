"use client";

import { useState, useEffect } from 'react';

export default function FilterByPrice ( { onPriceRangeChange, productsData = [] } ) {
  // Calcular el rango de precios de los productos
  const calculatePriceRange = () => {
    if ( productsData.length === 0 )
    {
      return { min: 0, max: 100 };
    }

    const prices = productsData.map( product => product.price );
    return {
      min: Math.floor( Math.min( ...prices ) ),
      max: Math.ceil( Math.max( ...prices ) )
    };
  };

  const priceRange = calculatePriceRange();

  const [ minPrice, setMinPrice ] = useState( priceRange.min );
  const [ maxPrice, setMaxPrice ] = useState( priceRange.max );
  const [ minInputValue, setMinInputValue ] = useState( priceRange.min.toFixed( 2 ) );
  const [ maxInputValue, setMaxInputValue ] = useState( priceRange.max.toFixed( 2 ) );

  // Actualizar valores cuando cambien los productos
  useEffect( () => {
    const newRange = calculatePriceRange();
    setMinPrice( newRange.min );
    setMaxPrice( newRange.max );
    setMinInputValue( newRange.min.toFixed( 2 ) );
    setMaxInputValue( newRange.max.toFixed( 2 ) );
  }, [ productsData ] );

  // Notificar al padre cuando cambie el rango de precios
  useEffect( () => {
    const timer = setTimeout( () => {
      if ( onPriceRangeChange )
      {
        onPriceRangeChange( { min: minPrice, max: maxPrice } );
      }
    }, 300 ); // Debounce de 300ms

    return () => clearTimeout( timer );
  }, [ minPrice, maxPrice, onPriceRangeChange ] );

  const handleMinPriceChange = ( e ) => {
    const inputValue = e.target.value;
    setMinInputValue( inputValue );

    // Solo actualizar el precio si es un número válido
    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      const newMin = Math.max( priceRange.min, Math.min( value, maxPrice - 0.01 ) );
      setMinPrice( newMin );
    }
  };

  const handleMinPriceBlur = () => {
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
  };

  const handleMaxPriceChange = ( e ) => {
    const inputValue = e.target.value;
    setMaxInputValue( inputValue );

    // Solo actualizar el precio si es un número válido
    if ( inputValue !== '' && !isNaN( inputValue ) )
    {
      const value = parseFloat( inputValue );
      const newMax = Math.min( priceRange.max, Math.max( value, minPrice + 0.01 ) );
      setMaxPrice( newMax );
    }
  };

  const handleMaxPriceBlur = () => {
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
  };

  const handleMinSliderChange = ( e ) => {
    const value = parseFloat( e.target.value );
    if ( value <= maxPrice - 0.01 )
    {
      setMinPrice( value );
      setMinInputValue( value.toFixed( 2 ) );
    }
  };

  const handleMaxSliderChange = ( e ) => {
    const value = parseFloat( e.target.value );
    if ( value >= minPrice + 0.01 )
    {
      setMaxPrice( value );
      setMaxInputValue( value.toFixed( 2 ) );
    }
  };

  // Calcular porcentajes para el rango visual
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