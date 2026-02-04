"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * @fileoverview Componente de filtro por nombre de productor con búsqueda en tiempo real
 * Implementa debouncing para optimizar las búsquedas y reducir re-renders innecesarios
 */

/**
 * Filtro de búsqueda por nombre de productor
 * 
 * Permite a los usuarios buscar productos filtrando por el nombre del productor.
 * Incluye debouncing de 300ms para evitar búsquedas excesivas mientras el usuario escribe.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onProducerSearchChange - Callback que se ejecuta cuando cambia el término de búsqueda (después del debounce)
 * 
 * @example
 * <FilterByProducer 
 *   onProducerSearchChange={(searchTerm) => console.log('Buscando:', searchTerm)} 
 * />
 */
export default function FilterByProducer ( { onProducerSearchChange } ) {
  // Estado local para el término de búsqueda
  const [ searchTerm, setSearchTerm ] = useState( '' );

  /**
   * Efecto de debouncing para búsqueda
   * Espera 300ms después de que el usuario deje de escribir antes de notificar al padre.
   * Esto reduce la cantidad de re-renders y mejora el rendimiento.
   */
  useEffect( () => {
    const timer = setTimeout( () => {
      if ( onProducerSearchChange )
      {
        onProducerSearchChange( searchTerm );
      }
    }, 300 );

    // Cleanup: cancelar el timer si el componente se desmonta o searchTerm cambia
    return () => clearTimeout( timer );
  }, [ searchTerm, onProducerSearchChange ] );

  /**
   * Maneja los cambios en el input de búsqueda
   * Actualiza el estado local inmediatamente para feedback visual instantáneo
   */
  const handleSearchChange = ( e ) => {
    setSearchTerm( e.target.value );
  };

  return (
    <>
      {/* Filter by Producer (Reusing TextField style) */}
      <div className="p-5 rounded-2xl border border-green-300 text-green-950 bg-green-50 brightness-105">
        <label className="block mb-3">
          <span className="text-base font-bold">Buscar Productor</span>
        </label>
        <div className="relative text-green-950">
          <input
            className="w-full h-12 bg-green-100 rounded-4xl border text-green-700 text-lg font-semibold placeholder:font-normal placeholder:text-green-700 border-green-300 px-4 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Ej. Granja El Sol..."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-2 top-2 bg-green-800 rounded-full h-8 w-8 flex items-center justify-center">
            <span className="text-xl p-2 rounded-full">
              <Image src="/lupa.svg" alt="search icon" width={20} height={20} className='' />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}