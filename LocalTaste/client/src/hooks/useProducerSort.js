import { useState, useCallback, useMemo } from 'react';

export function useProducerSort(initialData = []) {
  const [sortOption, setSortOption] = useState('relevancia');

  const sortedData = useMemo(() => {
    if (sortOption === 'relevancia') {
      return initialData;
    }

    const sorted = [...initialData];
    
    switch (sortOption) {
      case 'mejor-valorados':
        return sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));
      
      case 'mas-cercanos':
        return sorted.sort((a, b) => parseFloat(a.distance || 999) - parseFloat(b.distance || 999));
      
      case 'mas-lejanos':
        return sorted.sort((a, b) => parseFloat(b.distance || 0) - parseFloat(a.distance || 0));
      
      case 'popularidad':
        return sorted.sort((a, b) => {
          const aLikes = a.like ? 1 : 0;
          const bLikes = b.like ? 1 : 0;
          return bLikes - aLikes;
        });
      
      case 'nuevos':
        return sorted.sort((a, b) => b.id - a.id);
      
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
