import { useState, useCallback, useEffect, useMemo } from 'react';

export function useProductSort(initialData = []) {
  const [sortOption, setSortOption] = useState('relevancia');

  const sortedData = useMemo(() => {
    if (sortOption === 'relevancia') {
      return initialData;
    }

    const sorted = [...initialData];
    
    switch (sortOption) {
      case 'mejor-valorados':
        return sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));
      
      case 'recien-cosechado':
        return sorted.sort((a, b) => b.id - a.id);
      
      case 'ofertas':
        return sorted.sort((a, b) => {
          if (a.ofert && !b.ofert) return -1;
          if (!a.ofert && b.ofert) return 1;
          if (a.ofert && b.ofert) {
            const discountA = a.before ? ((a.before - a.price) / a.before) * 100 : 0;
            const discountB = b.before ? ((b.before - b.price) / b.before) * 100 : 0;
            return discountB - discountA;
          }
          return 0;
        });
      
      case 'popularidad':
        return sorted.sort((a, b) => {
          const aLikes = a.like ? 1 : 0;
          const bLikes = b.like ? 1 : 0;
          return bLikes - aLikes;
        });
      
      case 'precio-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      case 'precio-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      
      case 'alfabetico':
        return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      default:
        return initialData;
    }
  }, [initialData, sortOption]);

  const handleSortChange = useCallback((newSortOption) => {
    setSortOption(newSortOption);
  }, []);

  return {
    sortOption,
    sortedData,
    handleSortChange,
    setSortOption
  };
}
