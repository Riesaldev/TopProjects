/**
 * HOOK DE PAGINACIÓN CON SINCRONIZACIÓN DE URL
 * 
 * Este hook proporciona funcionalidad completa de paginación
 * con sincronización automática de la página actual en la URL.
 * 
 * Características:
 * - Sincronización bidireccional con URL
 * - Scroll automático al cambiar de página
 * - Cálculo automático de páginas totales
 * - Navegación entre páginas
 * - Reset automático al cambiar items
 * 
 * @module hooks/usePaginationWithURL
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * Hook de paginación con sincronización de URL
 * 
 * @param {Array} items - Array de items a paginar
 * @param {number} itemsPerPage - Número de items por página
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.scrollToTop - Si hacer scroll al inicio al cambiar página
 * @param {string} options.scrollBehavior - Comportamiento del scroll ('smooth' o 'auto')
 * @param {string} options.paramName - Nombre del parámetro en la URL
 * @returns {Object} Estado y funciones de paginación
 * 
 * @example
 * const { paginatedItems, currentPage, handlePageChange } = usePaginationWithURL(
 *   products, 
 *   12,
 *   { scrollToTop: true }
 * );
 */
export function usePaginationWithURL ( items = [], itemsPerPage = 10, options = {} ) {
  const {
    scrollToTop = true,
    scrollBehavior = 'smooth',
    paramName = 'page'
  } = options;

  // ========================================================================
  // HOOKS DE NEXT.JS
  // ========================================================================

  const searchParams = useSearchParams();
  const router = useRouter();

  // ========================================================================
  // ESTADO
  // ========================================================================

  // Página actual (1-indexed)
  const [ currentPage, setCurrentPage ] = useState( 1 );

  // ========================================================================
  // CÁLCULOS DE PAGINACIÓN
  // ========================================================================

  /**
   * Calcula el número total de páginas
   * Se recalcula cuando cambian los items o itemsPerPage
   */
  const totalPages = useMemo( () => {
    return Math.ceil( items.length / itemsPerPage );
  }, [ items.length, itemsPerPage ] );

  /**
   * Calcula los items de la página actual
   * Se recalcula cuando cambian items, página o itemsPerPage
   */
  const paginatedItems = useMemo( () => {
    const startIndex = ( currentPage - 1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice( startIndex, endIndex );
  }, [ items, currentPage, itemsPerPage ] );

  // ========================================================================
  // SINCRONIZACIÓN CON URL
  // ========================================================================

  /**
   * Lee la página desde la URL al montar el componente
   * Solo se ejecuta cuando cambia searchParams
   */
  useEffect( () => {
    const pageFromUrl = searchParams.get( paramName );
    if ( pageFromUrl )
    {
      const pageNum = parseInt( pageFromUrl, 10 );
      // Validar que sea un número válido y dentro del rango
      if ( !isNaN( pageNum ) && pageNum > 0 && pageNum <= totalPages )
      {
        setCurrentPage( pageNum );
      }
    }
  }, [ searchParams, paramName, totalPages ] );

  /**
   * Resetea a página 1 si la página actual excede el total
   * Útil cuando se aplican filtros que reducen el número de items
   */
  useEffect( () => {
    if ( currentPage > totalPages && totalPages > 0 )
    {
      setCurrentPage( 1 );
    }
  }, [ items.length, currentPage, totalPages ] );

  // ========================================================================
  // HANDLERS DE NAVEGACIÓN
  // ========================================================================

  /**
   * Cambia a una página específica
   * Actualiza la URL y opcionalmente hace scroll
   * 
   * @param {number} newPage - Número de página a la que navegar
   */
  const handlePageChange = useCallback( ( newPage ) => {
    // Validaciones
    if ( newPage < 1 || newPage > totalPages || newPage === currentPage ) return;

    // Actualizar URL con el nuevo número de página
    const params = new URLSearchParams( searchParams.toString() );
    params.set( paramName, newPage.toString() );
    router.push( `?${ params.toString() }`, { scroll: false } );

    // Actualizar estado local
    setCurrentPage( newPage );

    // Scroll al inicio de la página si está habilitado
    if ( scrollToTop )
    {
      window.scrollTo( { top: 0, behavior: scrollBehavior } );
    }
  }, [ currentPage, totalPages, searchParams, router, paramName, scrollToTop, scrollBehavior ] );

  /**
   * Navega a la primera página
   */
  const goToFirstPage = useCallback( () => {
    handlePageChange( 1 );
  }, [ handlePageChange ] );

  /**
   * Navega a la última página
   */
  const goToLastPage = useCallback( () => {
    handlePageChange( totalPages );
  }, [ handlePageChange, totalPages ] );

  /**
   * Navega a la página siguiente
   */
  const goToNextPage = useCallback( () => {
    handlePageChange( currentPage + 1 );
  }, [ handlePageChange, currentPage ] );

  /**
   * Navega a la página anterior
   */
  const goToPrevPage = useCallback( () => {
    handlePageChange( currentPage - 1 );
  }, [ handlePageChange, currentPage ] );

  // ========================================================================
  // RETORNO DEL HOOK
  // ========================================================================

  return {
    // Estado de paginación
    currentPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,

    // Items paginados
    paginatedItems,

    // Navegación
    handlePageChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,

    // Estado de navegación
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,

    // Setter directo
    setCurrentPage
  };
}
