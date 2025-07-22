import { useState, useEffect, useMemo } from 'react';
import { useHomeData } from './HomePage';

export const useGameSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { games, isLoading } = useHomeData('');

  // Debounced search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !games) return [];
    
    const query = searchQuery.toLowerCase().trim();
    
    return games.filter(game => 
      game.title.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query) ||
      (game.tags && game.tags.toLowerCase().includes(query)) ||
      (game.description && game.description.toLowerCase().includes(query))
    ).slice(0, 10); // Limit to 10 results for performance
  }, [games, searchQuery]);

  // Debounce search to avoid too many calculations
  useEffect(() => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching: isSearching || isLoading,
    hasResults: searchResults.length > 0,
    totalResults: searchResults.length
  };
};
