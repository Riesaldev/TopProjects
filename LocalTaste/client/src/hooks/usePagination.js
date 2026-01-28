import { useState, useMemo, useCallback, useEffect } from 'react';

/**
 * Hook para manejar la paginación de items
 * @param {Array} items - Array de items a paginar
 * @param {number} itemsPerPage - Cantidad de items por página (default: 10)
 * @returns {Object} Estado y funciones de paginación
 */
export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular items paginados
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  // Handler para cambiar de página
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Reset a página 1 cuando cambien los items
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    paginatedItems,
    totalPages,
    totalItems: items.length,
    handlePageChange,
    setCurrentPage
  };
}
