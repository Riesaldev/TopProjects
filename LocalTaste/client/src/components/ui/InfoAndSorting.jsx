"use client";

import { useState } from 'react';

export default function InfoAndSorting ( {
  filteredItems = [],
  totalItems = 0,
  onSortChange,
  type = 'products' // 'products' o 'producers'
} ) {
  const [ sortOption, setSortOption ] = useState( 'relevancia' );

  const displayedCount = filteredItems.length;
  const itemName = type === 'products' ? 'productos' : 'productores';

  const handleSortChange = ( e ) => {
    const value = e.target.value;
    setSortOption( value );

    if ( onSortChange )
    {
      onSortChange( value );
    }
  };

  // Opciones de ordenamiento según el tipo
  const sortOptions = type === 'products' ? {
    'relevancia': 'Relevancia',
    'mejor-valorados': '⭐ Mejor Valorados',
    'recien-cosechado': '🌱 Recién Cosechado',
    'ofertas': '🏷️ Ofertas',
    'popularidad': '❤️ Más Populares',
    'precio-asc': '💰 Precio: Menor a Mayor',
    'precio-desc': '💰 Precio: Mayor a Menor',
    'alfabetico': '🔤 A-Z'
  } : {
    'relevancia': 'Relevancia',
    'mejor-valorados': '⭐ Mejor Valorados',
    'mas-cercanos': '📍 Más Cercanos',
    'mas-lejanos': '📍 Más Lejanos',
    'popularidad': '❤️ Más Populares',
    'nuevos': '🆕 Nuevos',
    'alfabetico': '🔤 A-Z'
  };

  return (
    <>
      {/* Results Info & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm font-medium text-green-600">
          Mostrando <span className="font-bold text-green-950">{displayedCount}</span> de <span className="font-bold text-green-950">{totalItems}</span> {itemName}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-600">Ordenar por:</span>
          <select
            className="border-none text-sm font-bold rounded-lg bg-green-50 text-green-950 cursor-pointer py-1 pl-2 pr-8"
            value={sortOption}
            onChange={handleSortChange}
          >
            {Object.entries( sortOptions ).map( ( [ value, label ] ) => (
              <option key={value} value={value}>{label}</option>
            ) )}
          </select>
        </div>
      </div>
    </>
  );
}