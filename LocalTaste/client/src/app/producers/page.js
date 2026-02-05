"use client";

/**
 * @fileoverview Página de exploración de productores locales
 * Página completa con filtros múltiples, ordenamiento, paginación y grid de productores
 */

//importamos los hooks de next
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback, useState, useMemo } from 'react';
//importamos los componentes
import Header from "@/components/layout/Header";
import MiniFooter from "@/components/layout/MiniFooter";
import ProducerCard from "@/components/layout/producers/ProducerCard";
import ProducerFilters from "@/components/ui/producers/ProducerFilters";
import Pagination from "@/components/ui/Pagination";
import InfoAndSorting from "@/components/ui/InfoAndSorting";
//importamos los datos mockeados
import producerData from "@/data/producer.json";
//importamos los hooks
import { usePagination } from "@/hooks/usePagination";
import { useProducerSort } from "@/hooks/useProducerSort";

/**
 * Página de productores - Explora productores locales
 * 
 * Página principal para descubrir y conectar con productores del marketplace.
 * 
 * Características:
 * - Filtrado por tipo de producción (ecológica, artesanal, tradicional)
 * - Filtrado por distancia máxima (slider)
 * - Filtrado por valoración mínima (radio buttons)
 * - Ordenamiento por cercanía, valoración, nombre
 * - Paginación con sincronización de URL
 * - Grid responsive de tarjetas de productor
 * 
 * Lógica de filtrado:
 * - Los filtros se aplican con useMemo para optimizar rendimiento
 * - Todos los filtros son opcionales (se pueden combinar)
 * - Cambiar filtros resetea a la primera página
 * 
 * Hooks utilizados:
 * - useState: Gestiona estado de filtros localmente
 * - useMemo: Aplica filtros de forma optimizada
 * - useProducerSort: Maneja ordenamiento de resultados
 * - usePagination: Controla paginación
 * - useSearchParams/useRouter: Sincroniza con URL
 * 
 * @returns {JSX.Element} Página completa de productores
 * 
 * @example
 * // URL: /producers?page=1
 * <ProducersPage />
 */
export default function ProducersPage () {
  /** Número de productores por página */
  const ITEMS_PER_PAGE = 4;
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Estado para los filtros de productores
   * Agrupa todos los criterios de filtrado en un solo objeto
   * 
   * @property {Object} productionTypes - Tipos de producción seleccionados
   * @property {number} maxDistance - Distancia máxima en km
   * @property {number} minRating - Valoración mínima (0, 3, o 4)
   */
  const [ filters, setFilters ] = useState( {
    productionTypes: {
      ecologica: false,
      artesanal: false,
      tradicional: false,
      biodinamica: false
    },
    maxDistance: 100,
    minRating: 0
  } );

  /**
   * Aplicar filtros a los datos de productores
   * Usa useMemo para evitar recalcular el filtrado en cada render
   * 
   * Lógica de filtrado:
   * 1. Filtro por tipo de producción (ecológica, artesanal, tradicional)
   * 2. Filtro por distancia máxima
   * 3. Filtro por valoración mínima
   * 
   * Todos los filtros son acumulativos (AND lógico)
   */
  const filteredProducers = useMemo( () => {
    return producerData.filter( producer => {
      // Filtro por tipo de producción
      const hasProductionTypeSelected = Object.values( filters.productionTypes ).some( v => v );
      if ( hasProductionTypeSelected )
      {
        const producerProductionTypes = producer.productionType || [];
        const matchesProductionType = producerProductionTypes.some( type =>
          filters.productionTypes[ type ]
        );

        if ( !matchesProductionType ) return false;
      }

      // Filtro por distancia
      const producerDistance = parseFloat( producer.distance ) || 0;
      if ( producerDistance > filters.maxDistance ) return false;

      // Filtro por valoración
      const producerRating = parseFloat( producer.stars ) || 0;
      if ( producerRating < filters.minRating ) return false;

      return true;
    } );
  }, [ filters ] );

  /** Hook de ordenamiento - aplica sort a productores ya filtrados */
  const { sortedData: filteredAndSortedProducers, handleSortChange } = useProducerSort( filteredProducers );

  /** Hook de paginación - divide productores filtrados y ordenados en páginas */
  const {
    currentPage,
    paginatedItems: paginatedProducers,
    handlePageChange: handlePaginationChange,
    setCurrentPage
  } = usePagination( filteredAndSortedProducers, ITEMS_PER_PAGE );

  /**
   * Efecto: Leer página desde URL al montar
   * Permite compartir URLs con paginación específica
   */
  useEffect( () => {
    const pageFromUrl = searchParams.get( 'page' );
    if ( pageFromUrl )
    {
      const pageNum = parseInt( pageFromUrl, 10 );
      if ( !isNaN( pageNum ) && pageNum > 0 )
      {
        setCurrentPage( pageNum );
      }
    }
  }, [ searchParams, setCurrentPage ] );

  /**
   * Callback: Actualizar URL al cambiar de página
   * Sincroniza el query param ?page=N con el estado
   */
  const handlePageChange = useCallback( ( newPage ) => {
    const params = new URLSearchParams( searchParams.toString() );
    params.set( 'page', newPage.toString() );
    router.push( `?${ params.toString() }`, { scroll: false } );
    handlePaginationChange( newPage );
  }, [ router, searchParams, handlePaginationChange ] );

  /**
   * Callback: Manejar cambio de ordenamiento
   * Resetea a página 1 para evitar páginas vacías después de reordenar
   */
  const onSortChange = useCallback( ( newSortOption ) => {
    handleSortChange( newSortOption );
    setCurrentPage( 1 ); // Resetear a la primera página al ordenar
  }, [ handleSortChange, setCurrentPage ] );

  /**
   * Callback: Manejar cambio de filtros
   * Resetea a página 1 porque los resultados pueden reducirse drásticamente
   */
  const handleFilterChange = useCallback( ( newFilters ) => {
    setFilters( newFilters );
    setCurrentPage( 1 ); // Resetear a la primera página al filtrar
  }, [ setCurrentPage ] );

  return (
    <>
      <Header />
      <main className="max-w-8xl mx-auto bg-green-100 px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
        <div className="mb-2 p-6 text-left">
          <h2 className="text-4xl font-black mb-2 text-green-950">Explorar Productores</h2>
          <p className="text-lg max-w-2xl text-green-600">Conecta directamente con las manos que cultivan tus alimentos.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filtros */}
          <ProducerFilters onFilterChange={handleFilterChange} producers={producerData} />
          {/* Grid de Productores */}
          <section className="flex-1 min-w-0">
            <InfoAndSorting
              filteredItems={paginatedProducers}
              totalItems={filteredAndSortedProducers.length}
              type="producers"
              onSortChange={onSortChange}
            />
            {/* Productores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-24">
              {paginatedProducers.length > 0 ? (
                paginatedProducers.map( ( producer ) => (
                  <ProducerCard
                    key={producer.id}
                    producer={producer}
                  />
                ) )
              ) : (
                <p className="text-green-700 col-span-full text-center">No se encontraron productores.</p>
              )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center pt-25">
              <Pagination
                totalItems={filteredAndSortedProducers.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}