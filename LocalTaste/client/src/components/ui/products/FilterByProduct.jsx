"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * @fileoverview Componente de búsqueda y filtros rápidos de productos
 * Proporciona una barra de búsqueda con debouncing y filtros rápidos por características (orgánico, sin lactosa, etc.)
 */

/**
 * Filtro de búsqueda de productos con chips de filtros rápidos
 * 
 * Combina una barra de búsqueda con texto libre y filtros predefinidos (chips)
 * para características comunes como orgánico, vegano, sin gluten, etc.
 * Implementa debouncing en la búsqueda para optimizar rendimiento.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSearchChange - Callback ejecutado cuando cambia el término de búsqueda (con debounce)
 * @param {Function} props.onFilterChange - Callback ejecutado cuando se selecciona un filtro rápido
 * 
 * @example
 * <FilterByProduct 
 *   onSearchChange={(term) => console.log('Buscando:', term)}
 *   onFilterChange={(filter) => console.log('Filtro:', filter)}
 * />
 */
export default function FilterByProduct ( { onSearchChange, onFilterChange } ) {
  // Estado para el término de búsqueda
  const [ searchTerm, setSearchTerm ] = useState( '' );
  // Estado para controlar si el input está enfocado (para animaciones del placeholder)
  const [ isFocused, setIsFocused ] = useState( false );
  // Estado para el filtro rápido activo (todos, organico, sin-lactosa, etc.)
  const [ activeFilter, setActiveFilter ] = useState( 'todos' );

  /**
   * Efecto de debouncing para búsqueda
   * Espera 300ms después de que el usuario deje de escribir
   */
  useEffect( () => {
    const timer = setTimeout( () => {
      if ( onSearchChange )
      {
        onSearchChange( searchTerm );
      }
    }, 300 );

    return () => clearTimeout( timer );
  }, [ searchTerm, onSearchChange ] );

  /**
   * Maneja cambios en el input de búsqueda
   * Actualiza el estado local inmediatamente para feedback visual
   */
  const handleSearchChange = ( e ) => {
    setSearchTerm( e.target.value );
  };

  /**
   * Maneja clics en los filtros rápidos (chips)
   * Actualiza el filtro activo y notifica al componente padre
   * 
   * @param {string} filter - Filtro seleccionado (todos, organico, sin-lactosa, etc.)
   */
  const handleFilterClick = ( filter ) => {
    setActiveFilter( filter );
    if ( onFilterChange )
    {
      onFilterChange( filter );
    }
  };

  return (
    <>
      <div className="mb-6 items-center justify-around flex gap-6">
        <div className="flex w-1/2 items-center rounded-2xl border border-green-300 bg-green-50 p-2 shadow-sm transition-all">
          <div className="flex items-center justify-center pl-4 pr-2">
            <span className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-xl">
              <Image src="/lupa.svg" alt="search icon" width={24} height={24} />
            </span>
          </div>
          <div className="relative flex-1">
            <input
              id="search"
              className="w-full pl-2 pr-4 outline-none rounded-lg focus:ring-1 focus:ring-green-300 text-xl h-10 text-green-600"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused( true )}
              onBlur={() => setIsFocused( false )}
            />
            <label
              htmlFor="search"
              className={`absolute left-2 transition-all pointer-events-none ${ searchTerm || isFocused ? 'hidden' : 'top-2 text-xl text-green-600' }`}
            >
              Buscar manzanas, miel, queso artesanal...
            </label>
          </div>
        </div>
      </div>
      {/* Chips / Quick Filters */}
      <div className="flex gap-4 mb-8 ml-8 overflow-x-auto pb-2 scrollbar-hide">
        <button
          className={`shrink-0 px-4 py-2 rounded-full border border-green-300 text-base font-medium transition-all active:scale-95 cursor-pointer ${ activeFilter === 'todos'
            ? 'bg-green-400 text-green-950 font-bold'
            : 'bg-green-50 hover:bg-green-100'
            }`}
          onClick={() => handleFilterClick( 'todos' )}
        >
          Todos
        </button>
        <button
          className={`shrink-0 px-4 py-2 rounded-full border text-base font-medium transition-all active:scale-95 cursor-pointer ${ activeFilter === 'organico'
            ? 'bg-green-400 text-green-950 font-bold border-green-400'
            : 'bg-green-50 hover:bg-green-100'
            }`}
          onClick={() => handleFilterClick( 'organico' )}
        >
          🌱 Orgánico
        </button>
        <button
          className={`shrink-0 px-4 py-2 rounded-full border text-base font-medium transition-all active:scale-95 cursor-pointer ${ activeFilter === 'sin-lactosa'
            ? 'bg-green-400 text-green-950 font-bold border-green-400'
            : 'bg-green-50 hover:bg-green-100'
            }`}
          onClick={() => handleFilterClick( 'sin-lactosa' )}
        >
          🧀 Sin Lactosa
        </button>
        <button
          className={`shrink-0 px-4 py-2 rounded-full border text-base font-medium transition-all active:scale-95 cursor-pointer ${ activeFilter === 'sin-gluten'
            ? 'bg-green-400 text-green-950 font-bold border-green-400'
            : 'bg-green-50 hover:bg-green-100'
            }`}
          onClick={() => handleFilterClick( 'sin-gluten' )}
        >
          🥖 Sin Gluten
        </button>
        <button
          className={`shrink-0 px-4 py-2 rounded-full border text-base font-medium transition-all active:scale-95 cursor-pointer ${ activeFilter === 'vegano'
            ? 'bg-green-400 text-green-950 font-bold border-green-400'
            : 'bg-green-50 hover:bg-green-100'
            }`}
          onClick={() => handleFilterClick( 'vegano' )}
        >
          🥑 Vegano
        </button>
      </div>
    </>
  );
}