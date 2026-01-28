"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function FilterByCategory ( { onCategoryChange, productsData = [] } ) {
  const [ selectedCategories, setSelectedCategories ] = useState( [] );

  // Definir categorías con mapeo de tipos
  const categoryMapping = {
    'Frutas y Verduras': [ 'Fruta', 'Verdura' ],
    'Lácteos y Huevos': [ 'Lácteo', 'Huevos' ],
    'Panadería Artesanal': [ 'Panadería' ],
    'Carnes y Embutidos': [ 'Carne', 'Embutidos' ],
    'Miel y Mermeladas': [ 'Miel', 'Mermelada' ]
  };

  // Calcular cantidad de productos por categoría
  const getCategoryCount = ( categoryTypes ) => {
    return productsData.filter( product =>
      categoryTypes.includes( product.type )
    ).length;
  };

  // Manejar cambio de checkbox
  const handleCategoryToggle = ( category ) => {
    let updatedCategories;

    if ( selectedCategories.includes( category ) )
    {
      updatedCategories = selectedCategories.filter( cat => cat !== category );
    } else
    {
      updatedCategories = [ ...selectedCategories, category ];
    }

    setSelectedCategories( updatedCategories );
  };

  // Limpiar todos los filtros
  const handleClearAll = () => {
    setSelectedCategories( [] );
  };

  // Notificar al componente padre cuando cambian las categorías seleccionadas
  useEffect( () => {
    if ( onCategoryChange )
    {
      // Obtener todos los tipos de productos correspondientes a las categorías seleccionadas
      const selectedTypes = selectedCategories.flatMap( category => categoryMapping[ category ] || [] );
      onCategoryChange( selectedTypes );
    }
  }, [ selectedCategories ] );

  return (
    <>
      {/* Categories Filter */}
      <div className="p-5 rounded-2xl border border-green-300 text-green-950 bg-green-50 brightness-105">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold">Categorías</h3>
          <button
            onClick={handleClearAll}
            className="text-sm text-green-600 cursor-pointer font-serif font-black hover:bg-green-200 px-2 py-1 rounded-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedCategories.length === 0}
          >
            Limpiar
          </button>
        </div>
        <div className="space-y-3">
          {Object.entries( categoryMapping ).map( ( [ categoryName, types ] ) => {
            const count = getCategoryCount( types );
            const isChecked = selectedCategories.includes( categoryName );

            return (
              <label key={categoryName} className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle( categoryName )}
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="flex items-center justify-center w-5 h-5 bg-green-600 rounded-md">
                      <Image src="/check.svg" alt="check icon" width={22} height={22} />
                    </span>
                  </span>
                </div>
                <span className="text-sm text-gray-600 transition-colors">{categoryName}</span>
                <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full">{count}</span>
              </label>
            );
          } )}
        </div>
      </div>
    </>
  );
}