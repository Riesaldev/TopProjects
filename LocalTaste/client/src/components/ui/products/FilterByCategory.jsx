"use client";

import Image from 'next/image';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';

/**
 * @fileoverview Componente de filtro por categorías de productos
 * Permite filtrar productos por categorías predefinidas con checkboxes múltiples
 */

/**
 * Filtro de productos por categorías
 * 
 * Muestra checkboxes para filtrar productos por categorías como
 * "Frutas y Verduras", "Lácteos y Huevos", "Panadería Artesanal", etc.
 * Incluye contador de productos por categoría y botón para limpiar selección.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onCategoryChange - Callback ejecutado cuando cambian las categorías seleccionadas
 * @param {Array} props.productsData - Array de productos para calcular contadores por categoría
 * 
 * @example
 * <FilterByCategory 
 *   onCategoryChange={(categories) => console.log('Categorías:', categories)}
 *   productsData={products}
 * />
 */
export default function FilterByCategory ( { onCategoryChange, productsData = [] } ) {
  /**
   * Mapeo de categorías de interfaz a tipos de producto en la BD
   * Permite que una categoría de UI agrupe múltiples tipos de productos
   * 
   * @type {Object<string, string[]>}
   * @example
   * 'Frutas y Verduras' mapea a ['Fruta', 'Verdura']
   */
  const categoryMapping = {
    'Frutas y Verduras': [ 'Fruta', 'Verdura' ],
    'Lácteos y Huevos': [ 'Lácteo', 'Huevos' ],
    'Panadería Artesanal': [ 'Panadería' ],
    'Carnes y Embutidos': [ 'Carne', 'Embutidos' ],
    'Miel y Mermeladas': [ 'Miel', 'Mermelada' ]
  };

  const {
    selectedCategories,
    handleCategoryToggle,
    handleClearAll,
    getCategoryCount
  } = useCategoryFilter( categoryMapping, productsData, onCategoryChange );

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