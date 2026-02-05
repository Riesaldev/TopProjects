"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import Header from "@/components/layout/Header";
import MiniFooter from "@/components/layout/MiniFooter";
import FilterByProducer from "@/components/ui/products/FilterByProducer";
import FilterByCategory from "@/components/ui/products/FilterByCategory";
import FilterByPrice from "@/components/ui/products/FilterByPrice";
import FilterByProduct from "@/components/ui/products/FilterByProduct";
import InfoAndSorting from "@/components/ui/InfoAndSorting";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/layout/products/ProductCard";

import productsData from "@/data/products.json";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useProductSort } from "@/hooks/useProductSort";
import { usePagination } from "@/hooks/usePagination";

/**
 * @fileoverview Página de exploración de productos locales
 * Página completa con filtros, ordenamiento, paginación y grid de productos
 */

/**
 * Página de productos - Explora productos locales
 * 
 * Página principal para explorar y buscar productos del marketplace.
 * 
 * Características:
 * - Filtrado por nombre de producto, productor, categoría y precio
 * - Filtros rápidos (orgánico, vegano, sin gluten, etc.)
 * - Ordenamiento por relevancia, precio, valoración, novedad
 * - Paginación con sincronización de URL (query param ?page=N)
 * - Grid responsive de tarjetas de producto
 * - Sidebar con filtros colapsables
 * 
 * Hooks utilizados:
 * - useProductFilters: Gestiona todos los filtros de productos
 * - useProductSort: Maneja el ordenamiento de resultados
 * - usePagination: Controla la paginación de items
 * - useSearchParams/useRouter: Sincroniza estado con URL
 * 
 * @returns {JSX.Element} Página completa de productos
 * 
 * @example
 * // URL: /products?page=2
 * <ProductsPage />
 */
export default function ProductsPage () {
  /** Número de productos por página */
  const ITEMS_PER_PAGE = 5;
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Hook de filtrado de productos
   * Gestiona búsqueda por nombre, productor, categoría, precio y filtros rápidos
   */
  const {
    filteredProducts,
    handleSearchChange,
    handleProducerSearchChange,
    handleFilterChange,
    handleCategoryChange,
    handlePriceRangeChange
  } = useProductFilters( productsData );

  /** Hook de ordenamiento - aplica sort a productos ya filtrados */
  const { sortedData: filteredAndSortedProducts, handleSortChange } = useProductSort( filteredProducts );

  /** Hook de paginación - divide productos filtrados y ordenados en páginas */
  const {
    currentPage,
    paginatedItems: paginatedProducts,
    handlePageChange: handlePaginationChange,
    setCurrentPage
  } = usePagination( filteredAndSortedProducts, ITEMS_PER_PAGE );

  /**
   * Efecto: Leer página desde URL al montar el componente
   * Permite bookmarking y compartir URLs con paginación
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
   * Callback: Actualizar URL cuando cambie la página
   * Mantiene sincronizada la URL con el estado de paginación
   * Usa scroll:false para evitar saltos al top de la página
   */
  const handlePageChange = useCallback( ( newPage ) => {
    const params = new URLSearchParams( searchParams.toString() );
    params.set( 'page', newPage.toString() );
    router.push( `?${ params.toString() }`, { scroll: false } );
    handlePaginationChange( newPage );
  }, [ searchParams, router, handlePaginationChange ] );

  /**
   * Callback: Manejar cambio de ordenamiento
   * Resetea a la primera página al cambiar el orden para evitar páginas vacías
   */
  const onSortChange = useCallback( ( newSortOption ) => {
    handleSortChange( newSortOption );
    setCurrentPage( 1 ); // Resetear a la primera página al ordenar
  }, [ handleSortChange, setCurrentPage ] );

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
              filteredItems={paginatedProducts}
              totalItems={filteredAndSortedProducts.length}
              type="products"
              onSortChange={onSortChange}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 row-auto justify-around mb-8 gap-5">
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
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              className="justify-center items-center flex left-8 mb-8"
            />
          </section>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}