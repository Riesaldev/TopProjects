"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
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
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";

export default function ProductsPage() {
  const ITEMS_PER_PAGE = 4;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Usar hooks personalizados para filtrado y paginación
  const {
    filteredAndSortedProducts,
    handleSearchChange,
    handleProducerSearchChange,
    handleFilterChange,
    handleSortChange,
    handleCategoryChange,
    handlePriceRangeChange
  } = useProductFilters(productsData);

  const {
    currentPage,
    paginatedItems: paginatedProducts,
    handlePageChange: handlePaginationChange,
    setCurrentPage
  } = usePagination(filteredAndSortedProducts, ITEMS_PER_PAGE);

  // Leer página desde URL al montar el componente
  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) {
      const pageNum = parseInt(pageFromUrl, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }
  }, [searchParams, setCurrentPage]);

  // Actualizar URL cuando cambie la página
  const handlePageChange = useCallback((newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    handlePaginationChange(newPage);
  }, [searchParams, router, handlePaginationChange]);

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
                paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
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