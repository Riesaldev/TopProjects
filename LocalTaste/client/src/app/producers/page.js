"use client";
//importamos los hooks de next
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
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

export default function ProducersPage() {
  const ITEMS_PER_PAGE = 3;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hook de ordenamiento
  const { sortedData: filteredAndSortedProducers, handleSortChange } = useProducerSort(producerData);

  // Hook de paginación
  const {
    currentPage,
    paginatedItems: paginatedProducers,
    handlePageChange: handlePaginationChange,
    setCurrentPage
  } = usePagination(filteredAndSortedProducers, ITEMS_PER_PAGE);

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
  }, [router, searchParams, handlePaginationChange]);

  // Manejar cambio de ordenamiento y resetear página
  const onSortChange = useCallback((newSortOption) => {
    handleSortChange(newSortOption);
    setCurrentPage(1); // Resetear a la primera página al ordenar
  }, [handleSortChange, setCurrentPage]);

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
          <ProducerFilters />
          {/* Grid de Productores */}
          <section className="flex-1 min-w-0">
            <InfoAndSorting
              filteredItems={paginatedProducers}
              totalItems={filteredAndSortedProducers.length}
              type="producers"
              onSortChange={onSortChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {paginatedProducers.length > 0 ? (
                paginatedProducers.map((producer) => (
                  <ProducerCard
                    key={producer.id}
                    producer={producer}
                  />
                ))
              ) : (
                <p className="text-green-700 col-span-full text-center">No se encontraron productores.</p>
              )}
            </div>
            {/* Pagination */}
            <Pagination
              totalItems={filteredAndSortedProducers.length}
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