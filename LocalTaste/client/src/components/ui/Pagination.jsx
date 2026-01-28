"use client";
import Image from "next/image";

export default function Pagination ( {
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = 5
} ) {
  const totalPages = Math.ceil( totalItems / itemsPerPage );

  // Si no hay suficientes items para paginar, no mostrar nada
  if ( totalItems <= itemsPerPage )
  {
    return null;
  }

  const handlePageChange = ( newPage ) => {
    if ( newPage < 1 || newPage > totalPages ) return;
    if ( newPage === currentPage ) return; // Evitar cambios innecesarios
    onPageChange?.( newPage );
  };

  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor( maxVisiblePages / 2 );

    let startPage = Math.max( 1, currentPage - halfVisible );
    let endPage = Math.min( totalPages, startPage + maxVisiblePages - 1 );

    if ( endPage - startPage + 1 < maxVisiblePages )
    {
      startPage = Math.max( 1, endPage - maxVisiblePages + 1 );
    }

    // Primera página
    if ( startPage > 1 )
    {
      pages.push( 1 );
      if ( startPage > 2 )
      {
        pages.push( '...' );
      }
    }

    // Páginas visibles
    for ( let i = startPage; i <= endPage; i++ )
    {
      pages.push( i );
    }

    // Última página
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

  return (
    <div className="flex justify-center mt-12 mb-22 gap-2">
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