"use client";

import { useState } from 'react';
import productsData from "@/data/products.json";

export default function InfoAndSorting ( { filteredProducts, onSortChange } ) {
  const [ sortOption, setSortOption ] = useState( 'relevancia' );

  const totalProducts = productsData.length;
  const displayedCount = filteredProducts ? filteredProducts.length : 0;

  const handleSortChange = ( e ) => {
    const value = e.target.value;
    setSortOption( value );

    if ( onSortChange )
    {
      onSortChange( value );
    }
  };

  return (
    <>
      {/* Results Info & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm font-medium text-green-600">
          Mostrando <span className="font-bold text-green-950">{displayedCount}</span> de <span className="font-bold text-green-950">{totalProducts}</span> productos
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-600">Ordenar por:</span>
          <select
            className="border-none text-sm font-bold rounded-lg bg-green-50 text-green-950 cursor-pointer py-1 pl-2 pr-8"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="relevancia">Relevancia</option>
            <option value="mejor-valorados">⭐ Mejor Valorados</option>
            <option value="recien-cosechado">🌱 Recién Cosechado</option>
            <option value="ofertas">🏷️ Ofertas</option>
            <option value="popularidad">❤️ Más Populares</option>
            <option value="precio-asc">💰 Precio: Menor a Mayor</option>
            <option value="precio-desc">💰 Precio: Mayor a Menor</option>
            <option value="alfabetico">🔤 A-Z</option>
          </select>
        </div>
      </div>
    </>
  );
}