import { useState, useMemo, useCallback } from 'react';

/**
 * Hook para manejar todo el sistema de filtrado y ordenamiento de productos
 * @param {Array} productsData - Array de productos
 * @returns {Object} Estado y funciones de filtrado
 */
export function useProductFilters(productsData) {
  const [searchTerm, setSearchTerm] = useState('');
  const [producerSearchTerm, setProducerSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('todos');
  const [sortOption, setSortOption] = useState('relevancia');
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  // Función para filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData;

    // Filtro por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.productor?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por productor
    if (producerSearchTerm.trim()) {
      filtered = filtered.filter(product =>
        (product.productor?.toLowerCase() || '').includes(producerSearchTerm.toLowerCase())
      );
    }

    // Filtro por categorías seleccionadas
    if (selectedCategoryTypes.length > 0) {
      filtered = filtered.filter(product =>
        product.type && selectedCategoryTypes.includes(product.type)
      );
    }

    // Filtro por rango de precios
    if (priceRange.min > 0 || priceRange.max < Infinity) {
      filtered = filtered.filter(product =>
        product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    // Filtro por categoría/tipo
    if (currentFilter !== 'todos') {
      switch (currentFilter) {
        case 'organico':
          filtered = filtered.filter(product =>
            (product.description?.toLowerCase() || '').includes('orgánico') ||
            (product.description?.toLowerCase() || '').includes('ecológico') ||
            (product.description?.toLowerCase() || '').includes('natural')
          );
          break;
        case 'sin-lactosa':
          filtered = filtered.filter(product =>
            product.type !== 'Lácteo' ||
            (product.description?.toLowerCase() || '').includes('sin lactosa')
          );
          break;
        case 'sin-gluten':
          filtered = filtered.filter(product =>
            (product.description?.toLowerCase() || '').includes('sin gluten') ||
            product.type === 'Fruta' ||
            product.type === 'Verdura'
          );
          break;
        case 'vegano':
          filtered = filtered.filter(product =>
            product.type !== 'Lácteo' &&
            product.type !== 'Carne' &&
            !(product.description?.toLowerCase() || '').includes('huevo')
          );
          break;
        case 'mejor-valorados':
          filtered = filtered.filter(product => (product.stars || 0) >= 4.5);
          break;
        default:
          break;
      }
    }

    // Ordenamiento
    let sorted = [...filtered];
    switch (sortOption) {
      case 'precio-asc':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'precio-desc':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'recien-cosechado':
        sorted.sort((a, b) => {
          const getFreshnessScore = (product) => {
            if (!product.popupInfo) return 0;
            const info = product.popupInfo.toLowerCase();
            if (info.includes('cosechad')) return 3;
            if (info.includes('edición limitada')) return 2;
            return 1;
          };

          const scoreA = getFreshnessScore(a);
          const scoreB = getFreshnessScore(b);

          if (scoreB === scoreA) {
            return (b.stars || 0) - (a.stars || 0);
          }
          return scoreB - scoreA;
        });
        break;
      case 'mejor-valorados':
        sorted.sort((a, b) => {
          const starsA = a.stars || 0;
          const starsB = b.stars || 0;

          if (starsB !== starsA) {
            return starsB - starsA;
          }
          return (a.price || 0) - (b.price || 0);
        });
        break;
      case 'ofertas':
        sorted.sort((a, b) => {
          if (a.ofert && !b.ofert) return -1;
          if (!a.ofert && b.ofert) return 1;

          if (a.ofert && b.ofert) {
            const discountA = a.before ? ((a.before - a.price) / a.before) * 100 : 0;
            const discountB = b.before ? ((b.before - b.price) / b.before) * 100 : 0;
            return discountB - discountA;
          }

          return (b.stars || 0) - (a.stars || 0);
        });
        break;
      case 'popularidad':
        sorted.sort((a, b) => {
          if (a.like && !b.like) return -1;
          if (!a.like && b.like) return 1;
          return (b.stars || 0) - (a.stars || 0);
        });
        break;
      case 'alfabetico':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es'));
        break;
      case 'relevancia':
      default:
        sorted.sort((a, b) => {
          const getRelevanceScore = (product) => {
            let score = 0;
            if (product.popupInfo) score += 3;
            if (product.ofert) score += 2.5;
            score += ((product.stars || 0) / 5) * 2;
            if (product.like) score += 1.5;
            return score;
          };

          return getRelevanceScore(b) - getRelevanceScore(a);
        });
        break;
    }

    return sorted;
  }, [searchTerm, producerSearchTerm, currentFilter, sortOption, selectedCategoryTypes, priceRange, productsData]);

  // Handlers con useCallback para evitar re-renders
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleProducerSearchChange = useCallback((term) => {
    setProducerSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortOption(sort);
  }, []);

  const handleCategoryChange = useCallback((categoryTypes) => {
    setSelectedCategoryTypes(categoryTypes);
  }, []);

  const handlePriceRangeChange = useCallback((range) => {
    setPriceRange(range);
  }, []);

  return {
    // Estado
    searchTerm,
    producerSearchTerm,
    currentFilter,
    sortOption,
    selectedCategoryTypes,
    priceRange,
    filteredAndSortedProducts,
    // Handlers
    handleSearchChange,
    handleProducerSearchChange,
    handleFilterChange,
    handleSortChange,
    handleCategoryChange,
    handlePriceRangeChange,
    // Setters directos (por si se necesitan)
    setSearchTerm,
    setProducerSearchTerm,
    setCurrentFilter,
    setSortOption,
    setSelectedCategoryTypes,
    setPriceRange
  };
}
