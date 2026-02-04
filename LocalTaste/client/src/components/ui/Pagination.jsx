/**
 * COMPONENTE DE PAGINACIÓN
 * 
 * Componente reutilizable para navegación entre páginas de resultados.
 * 
 * Características:
 * - Botones de navegación anterior/siguiente
 * - Números de página con elipsis para rangos grandes
 * - Accesibilidad con ARIA labels
 * - Diseño responsive
 * - Se oculta automáticamente si no hay suficientes items
 * 
 * @component
 */

"use client";

import Image from "next/image";
import { PAGINATION } from "@/constants";

/**
 * @param {Object} props
 * @param {number} props.totalItems - Total de items a paginar
 * @param {number} props.itemsPerPage - Items por página
 * @param {number} props.currentPage - Página actual (1-indexed)
 * @param {Function} props.onPageChange - Callback al cambiar de página
 * @param {number} props.maxVisiblePages - Máximo de páginas visibles
 */
export default function Pagination ( {
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = PAGINATION.MAX_VISIBLE_PAGES
} ) {
  // ========================================================================
  // CÁLCULOS
  // ========================================================================

  // Calcular número total de páginas
  const totalPages = Math.ceil( totalItems / itemsPerPage );

  // No mostrar paginación si no hay suficientes items
  if ( totalItems <= itemsPerPage )
  {
    return null;
  }

  // ========================================================================
  // HANDLERS
  // ========================================================================

  /**
   * Maneja el cambio de página con validación
   * @param {number} newPage - Nueva página a la que navegar
   */
  const handlePageChange = ( newPage ) => {
    // Validar rango
    if ( newPage < 1 || newPage > totalPages ) return;

    // Evitar cambios innecesarios
    if ( newPage === currentPage ) return;

    // Notificar al padre
    onPageChange?.( newPage );
  };

  // ========================================================================
  // CÁLCULO DE PÁGINAS VISIBLES
  // ========================================================================

  /**
   * Calcula qué números de página mostrar
   * Incluye elipsis (...) cuando hay muchas páginas
   * 
   * @returns {Array} Array de números de página y elipsis
   */
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor( maxVisiblePages / 2 );

    // Calcular rango de páginas visibles
    let startPage = Math.max( 1, currentPage - halfVisible );
    let endPage = Math.min( totalPages, startPage + maxVisiblePages - 1 );

    // Ajustar startPage si endPage está al límite
    if ( endPage - startPage + 1 < maxVisiblePages )
    {
      startPage = Math.max( 1, endPage - maxVisiblePages + 1 );
    }

    // Primera página (si no está en el rango)
    if ( startPage > 1 )
    {
      pages.push( 1 );
      if ( startPage > 2 )
      {
        pages.push( '...' );
      }
    }

    // Páginas del rango visible
    for ( let i = startPage; i <= endPage; i++ )
    {
      pages.push( i );
    }

    // Última página (si no está en el rango)
    if ( endPage < totalPages )
    {
      if ( endPage < totalPages - 1 )
      {
        pages.push( '...' );
      }
      pages.push( totalPages );
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex justify-center mt-12 mb-22 gap-2" role="navigation" aria-label="Paginación">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange( currentPage - 1 )}
        disabled={currentPage === 1}
        className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all
          ${ currentPage === 1
            ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
            : 'border-green-200 bg-green-50 hover:bg-green-100 hover:scale-105 active:scale-95 cursor-pointer'
          }`}
        aria-label="Página anterior"
      >
        <Image
          src="/Arrow.svg"
          alt="arrow left icon"
          width={28}
          height={28}
          className="rotate-180"
        />
      </button>

      {/* Números de página */}
      {pageNumbers.map( ( pageNum, index ) => (
        pageNum === '...' ? (
          <span
            key={`ellipsis-${ index }`}
            className="h-10 w-10 flex items-center justify-center text-gray-400 font-medium"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => handlePageChange( pageNum )}
            className={`h-10 w-10 flex items-center justify-center rounded-xl font-semibold transition-all
              ${ currentPage === pageNum
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'border border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50 hover:scale-105 active:scale-95'
              }`}
            aria-label={`Página ${ pageNum }`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        )
      ) )}

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange( currentPage + 1 )}
        disabled={currentPage === totalPages}
        className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all
          ${ currentPage === totalPages
            ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
            : 'border-green-200 bg-green-50 hover:bg-green-100 hover:scale-105 active:scale-95 cursor-pointer'
          }`}
        aria-label="Página siguiente"
      >
        <Image
          src="/Arrow.svg"
          alt="arrow right icon"
          width={28}
          height={28}
        />
      </button>
    </div>
  );
}