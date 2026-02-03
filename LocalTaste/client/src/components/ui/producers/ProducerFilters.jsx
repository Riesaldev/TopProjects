"use client";

import { useState, useEffect } from 'react';

export default function ProducerFilters ( { onFilterChange } ) {
  // Estados para los filtros
  const [ productionTypes, setProductionTypes ] = useState( {
    ecologica: false,
    artesanal: false,
    tradicional: false,
  } );

  const [ maxDistance, setMaxDistance ] = useState( 100 ); // km
  const [ minRating, setMinRating ] = useState( 0 ); // 0 = todas, 3 = 3+, 4 = 4+

  // Notificar al padre cuando cambian los filtros
  useEffect( () => {
    if ( onFilterChange )
    {
      onFilterChange( {
        productionTypes,
        maxDistance,
        minRating
      } );
    }
  }, [ productionTypes, maxDistance, minRating, onFilterChange ] );

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setProductionTypes( {
      ecologica: false,
      artesanal: false,
      tradicional: false
    } );
    setMaxDistance( 100 );
    setMinRating( 0 );
  };

  // Función para toggle tipo de producción
  const toggleProductionType = ( type ) => {
    setProductionTypes( prev => ( {
      ...prev,
      [ type ]: !prev[ type ]
    } ) );
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = Object.values( productionTypes ).some( v => v ) || maxDistance < 100 || minRating > 0;

  return (
    <>
      {/* Sidebar / Filtros */}
      <aside className="w-full lg:w-64 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e7f3ec]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Filtros</h3>
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${ hasActiveFilters
                  ? 'hover:text-green-700/80 cursor-pointer'
                  : 'text-green-400 cursor-not-allowed'
                }`}
            >
              Limpiar
            </button>
          </div>
          {/* Tipo de Producción */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Producción</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input
                  checked={productionTypes.ecologica}
                  onChange={() => toggleProductionType( 'ecologica' )}
                  className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent text-primary focus:ring-0 checked:bg-[image:--checkbox-tick-svg]"
                  type="checkbox"
                />
                <span className="text-[#0d1b13] text-sm transition-colors">Ecológica</span>
              </label>
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input
                  checked={productionTypes.artesanal}
                  onChange={() => toggleProductionType( 'artesanal' )}
                  className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--checkbox-tick-svg]"
                  type="checkbox"
                />
                <span className="text-[#0d1b13] text-sm transition-colors">Artesanal</span>
              </label>
              <label className="flex items-center gap-3 py-1 cursor-pointer group">
                <input
                  checked={productionTypes.tradicional}
                  onChange={() => toggleProductionType( 'tradicional' )}
                  className="h-5 w-5 rounded border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--checkbox-tick-svg]"
                  type="checkbox"
                />
                <span className="text-[#0d1b13] text-sm transition-colors">Tradicional</span>
              </label>
            </div>
          </div>
          {/* Distancia Slider */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Cercanía</span>
            </div>
            <div className="relative flex w-full flex-col items-start gap-3 py-2">
              <p className="text-[#0d1b13] text-xs">Distancia máxima: <span className="font-bold">{maxDistance} km</span></p>
              <div className="flex h-2 w-full pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={maxDistance}
                  onChange={( e ) => setMaxDistance( Number( e.target.value ) )}
                  className="w-full h-1.5 bg-[#cfe7d9] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:border-none"
                />
              </div>
              <div className="flex justify-between w-full text-[10px] text-[#4c9a6c]">
                <span>0 km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>
          {/* Valoración Radio */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold uppercase tracking-wider">Valoración</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input
                  checked={minRating === 4}
                  onChange={() => setMinRating( 4 )}
                  className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]"
                  name="rating"
                  type="radio"
                />
                <span className="text-[#0d1b13] text-sm font-medium">4+ Estrellas</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input
                  checked={minRating === 3}
                  onChange={() => setMinRating( 3 )}
                  className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]"
                  name="rating"
                  type="radio"
                />
                <span className="text-[#0d1b13] text-sm font-medium">3+ Estrellas</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-[#cfe7d9] hover:bg-[#e7f3ec] cursor-pointer transition-colors">
                <input
                  checked={minRating === 0}
                  onChange={() => setMinRating( 0 )}
                  className="h-4 w-4 border-2 border-[#cfe7d9] bg-transparent focus:ring-0 checked:bg-[image:--radio-dot-svg]"
                  name="rating"
                  type="radio"
                />
                <span className="text-[#0d1b13] text-sm font-medium">Todas</span>
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}