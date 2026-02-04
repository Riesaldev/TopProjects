/**
 * COMPONENTE DE INFORMACIÓN Y ORDENAMIENTO
 * 
 * Componente que muestra la información de resultados filtrados
 * y proporciona opciones de ordenamiento.
 * 
 * Características:
 * - Muestra conteo de items filtrados vs totales
 * - Selector de opciones de ordenamiento
 * - Adaptable a diferentes tipos (productos/productores)
 * 
 * @component
 */

"use client";

import { useState } from 'react';
import { PRODUCT_SORT_OPTIONS, PRODUCER_SORT_OPTIONS } from '@/constants';

/**
 * @param {Object} props
 * @param {Array} props.filteredItems - Items actualmente visibles en la página
 * @param {number} props.totalItems - Total de items después de filtrar
 * @param {Function} props.onSortChange - Callback cuando cambia el ordenamiento
 * @param {string} props.type - Tipo de items: 'products' o 'producers'
 */
export default function InfoAndSorting ( {
  filteredItems = [],
  totalItems = 0,
  onSortChange,
  type = 'products'
} ) {
  // ========================================================================
  // ESTADO
  // ========================================================================

  const [ sortOption, setSortOption ] = useState( 'relevancia' );

  // ========================================================================
  // CONFIGURACIÓN BASADA EN TIPO
  // ========================================================================

  // Contador de items mostrados en la página actual
  const displayedCount = filteredItems.length;

  // Nombre del tipo de item (productos/productores)
  const itemName = type === 'products' ? 'productos' : 'productores';

  // Opciones de ordenamiento según el tipo
  const sortOptions = type === 'products' ? PRODUCT_SORT_OPTIONS : PRODUCER_SORT_OPTIONS;

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Maneja el cambio de opción de ordenamiento
   * Actualiza estado local y notifica al padre
   */
  const handleSortChange = ( e ) => {
    const value = e.target.value;
    setSortOption( value );

    // Notificar al componente padre
    if ( onSortChange )
    {
      onSortChange( value );
    }
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Información de resultados */}
      <p className="text-sm font-medium text-green-600">
        Mostrando{' '}
        <span className="font-bold text-green-950">{displayedCount}</span>
        {' '}de{' '}
        <span className="font-bold text-green-950">{totalItems}</span>
        {' '}{itemName}
      </p>

      {/* Selector de ordenamiento */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-green-600">Ordenar por:</span>
        <select
          className="border-none text-sm font-bold rounded-lg bg-green-50 text-green-950 cursor-pointer py-1 pl-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortOption}
          onChange={handleSortChange}
          aria-label="Ordenar resultados"
        >
          {Object.entries( sortOptions ).map( ( [ value, label ] ) => (
            <option key={value} value={value}>
              {label}
            </option>
          ) )}
        </select>
      </div>
    </div>
  );
}