"use client";

import { useState, useMemo, useCallback } from 'react';
import Header from "@/components/layout/Header";
import MiniFooter from "@/components/layout/MiniFooter";
import FilterByProducer from "@/components/ui/FilterByProducer";
import FilterByCategory from "@/components/ui/FilterByCategory";
import FilterByPrice from "@/components/ui/FilterByPrice";
import FilterByProduct from "@/components/ui/FilterByProduct";
import InfoAndSorting from "@/components/ui/InfoAndSorting";
import Pagination from "@/components/ui/Pagination";

import ProductCard from "@/components/layout/products/ProductCard";
import productsData from "@/data/products.json";

export default function ProductsPage () {

  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ producerSearchTerm, setProducerSearchTerm ] = useState( '' );
  const [ currentFilter, setCurrentFilter ] = useState( 'todos' );
  const [ sortOption, setSortOption ] = useState( 'relevancia' );
  const [ selectedCategoryTypes, setSelectedCategoryTypes ] = useState( [] );
  const [ priceRange, setPriceRange ] = useState( { min: 0, max: Infinity } );
  const [ currentPage, setCurrentPage ] = useState( 1 );

  // Función para filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo( () => {
    let filtered = productsData;

    // Filtro por término de búsqueda
    if ( searchTerm.trim() )
    {
      filtered = filtered.filter( product =>
        ( product.name?.toLowerCase() || '' ).includes( searchTerm.toLowerCase() ) ||
        ( product.description?.toLowerCase() || '' ).includes( searchTerm.toLowerCase() ) ||
        ( product.productor?.toLowerCase() || '' ).includes( searchTerm.toLowerCase() )
      );
    }

    // Filtro por productor
    if ( producerSearchTerm.trim() )
    {
      filtered = filtered.filter( product =>
        ( product.productor?.toLowerCase() || '' ).includes( producerSearchTerm.toLowerCase() )
      );
    }

    // Filtro por categorías seleccionadas
    if ( selectedCategoryTypes.length > 0 )
    {
      filtered = filtered.filter( product =>
        product.type && selectedCategoryTypes.includes( product.type )
      );
    }

    // Filtro por rango de precios
    if ( priceRange.min > 0 || priceRange.max < Infinity )
    {
      filtered = filtered.filter( product =>
        product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    // Filtro por categoría/tipo
    if ( currentFilter !== 'todos' )
    {
      switch ( currentFilter )
      {
        case 'organico':
          filtered = filtered.filter( product =>
            ( product.description?.toLowerCase() || '' ).includes( 'orgánico' ) ||
            ( product.description?.toLowerCase() || '' ).includes( 'ecológico' ) ||
            ( product.description?.toLowerCase() || '' ).includes( 'natural' )
          );
          break;
        case 'sin-lactosa':
          filtered = filtered.filter( product =>
            product.type !== 'Lácteo' ||
            ( product.description?.toLowerCase() || '' ).includes( 'sin lactosa' )
          );
          break;
        case 'sin-gluten':
          filtered = filtered.filter( product =>
            ( product.description?.toLowerCase() || '' ).includes( 'sin gluten' ) ||
            product.type === 'Fruta' ||
            product.type === 'Verdura'
          );
          break;
        case 'vegano':
          filtered = filtered.filter( product =>
            product.type !== 'Lácteo' &&
            product.type !== 'Carne' &&
            !( product.description?.toLowerCase() || '' ).includes( 'huevo' )
          );
          break;
        case 'mejor-valorados':
          filtered = filtered.filter( product => ( product.stars || 0 ) >= 4.5 );
          break;
        default:
          break;
      }
    }

    // Ordenamiento
    let sorted = [ ...filtered ];
    switch ( sortOption )
    {
      case 'precio-asc':
        sorted.sort( ( a, b ) => ( a.price || 0 ) - ( b.price || 0 ) );
        break;
      case 'precio-desc':
        sorted.sort( ( a, b ) => ( b.price || 0 ) - ( a.price || 0 ) );
        break;
      case 'recien-cosechado':
        sorted.sort( ( a, b ) => {
          const getFreshnessScore = ( product ) => {
            if ( !product.popupInfo ) return 0;
            const info = product.popupInfo.toLowerCase();
            if ( info.includes( 'cosechad' ) ) return 3;
            if ( info.includes( 'edición limitada' ) ) return 2;
            return 1;
          };

          const scoreA = getFreshnessScore( a );
          const scoreB = getFreshnessScore( b );

          if ( scoreB === scoreA )
          {
            return ( b.stars || 0 ) - ( a.stars || 0 );
          }
          return scoreB - scoreA;
        } );
        break;
      case 'mejor-valorados':
        sorted.sort( ( a, b ) => {
          const starsA = a.stars || 0;
          const starsB = b.stars || 0;

          if ( starsB !== starsA )
          {
            return starsB - starsA;
          }
          return ( a.price || 0 ) - ( b.price || 0 );
        } );
        break;
      case 'ofertas':
        sorted.sort( ( a, b ) => {
          if ( a.ofert && !b.ofert ) return -1;
          if ( !a.ofert && b.ofert ) return 1;

          if ( a.ofert && b.ofert )
          {
            const discountA = a.before ? ( ( a.before - a.price ) / a.before ) * 100 : 0;
            const discountB = b.before ? ( ( b.before - b.price ) / b.before ) * 100 : 0;
            return discountB - discountA;
          }

          return ( b.stars || 0 ) - ( a.stars || 0 );
        } );
        break;
      case 'popularidad':
        sorted.sort( ( a, b ) => {
          if ( a.like && !b.like ) return -1;
          if ( !a.like && b.like ) return 1;
          return ( b.stars || 0 ) - ( a.stars || 0 );
        } );
        break;
      case 'alfabetico':
        sorted.sort( ( a, b ) => ( a.name || '' ).localeCompare( b.name || '', 'es' ) );
        break;
      case 'relevancia':
      default:
        sorted.sort( ( a, b ) => {
          const getRelevanceScore = ( product ) => {
            let score = 0;
            if ( product.popupInfo ) score += 3;
            if ( product.ofert ) score += 2.5;
            score += ( ( product.stars || 0 ) / 5 ) * 2;
            if ( product.like ) score += 1.5;
            return score;
          };

          return getRelevanceScore( b ) - getRelevanceScore( a );
        } );
        break;
    }

    return sorted;
  }, [ searchTerm, producerSearchTerm, currentFilter, sortOption, selectedCategoryTypes, priceRange ] );

  // Productos paginados
  const itemsPerPage = 4;
  const paginatedProducts = useMemo( () => {
    const startIndex = ( currentPage - 1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice( startIndex, endIndex );
  }, [ filteredAndSortedProducts, currentPage ] );

  const handleSearchChange = useCallback( ( term ) => {
    setSearchTerm( term );
    setCurrentPage( 1 );
  }, [] );

  const handleProducerSearchChange = useCallback( ( term ) => {
    setProducerSearchTerm( term );
    setCurrentPage( 1 );
  }, [] );

  const handleFilterChange = useCallback( ( filter ) => {
    setCurrentFilter( filter );
    setCurrentPage( 1 );
  }, [] );

  const handleSortChange = useCallback( ( sort ) => {
    setSortOption( sort );
  }, [] );

  const handleCategoryChange = useCallback( ( categoryTypes ) => {
    setSelectedCategoryTypes( categoryTypes );
    setCurrentPage( 1 );
  }, [] );

  const handlePriceRangeChange = useCallback( ( range ) => {
    setPriceRange( range );
    setCurrentPage( 1 );
  }, [] );

  const handlePageChange = useCallback( ( newPage ) => {
    setCurrentPage( newPage );
    window.scrollTo( { top: 0, behavior: 'smooth' } );
  }, [] );

  return (
    <>
      <Header />
      <main className="max-w-8xl mx-auto bg-green-100 px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
        <div className="mb-2 p-6 text-left">
          <h2 className="text-4xl font-black mb-2 text-green-950">
            Explora Productos Locales
          </h2>
          <p className="text-lg max-w-2xl text-green-600">
            Encuentra alimentos frescos y apoya a los productores de tu comunidad.<br /> Desde la granja directamente a tu mesa.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <FilterByProducer onProducerSearchChange={handleProducerSearchChange} />
            <FilterByCategory
              onCategoryChange={handleCategoryChange}
              productsData={productsData}
            />
            <FilterByPrice
              onPriceRangeChange={handlePriceRangeChange}
              productsData={productsData}
            />
          </aside>
          <section className="flex-1 min-w-0">
            <FilterByProduct
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
            />
            <InfoAndSorting
              filteredProducts={filteredAndSortedProducts}
              onSortChange={handleSortChange}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 row-auto justify-around mb-8 gap-3">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map( ( product ) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ) )
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No se encontraron productos que coincidan con tu búsqueda.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Intenta con otros términos o revisa los filtros aplicados.
                  </p>
                </div>
              )}
            </div>
            <Pagination
              totalItems={filteredAndSortedProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}