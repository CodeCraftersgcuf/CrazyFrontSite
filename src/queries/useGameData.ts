import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Game } from '../data/types';

export const useGameData = (category: string, search: string, page: number) => {
  const fetchGameData = async (): Promise<Game[]> => {
    // Handle category names with spaces by replacing spaces with empty string for file names
    const categoryFileName = category.replace(/\s+/g, '');
    const response = await fetch(`/data/Categories/${categoryFileName}Data.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch game data: ${response.statusText} (${response.status})`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('JSON parsing error:', error);
      throw new Error('Failed to parse game data');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', category],
    queryFn: fetchGameData,
    retry: false, // Don't retry on failure
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const ITEMS_PER_PAGE = 20;

  const filteredAndPaginatedData = useMemo(() => {
    if (!data) return { games: [], totalPages: 0 };

    const filtered = search
      ? data.filter((game: Game) =>
          game.title.toLowerCase().includes(search.toLowerCase())
        )
      : data;

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const games = filtered.slice(start, end);

    return { games, totalPages };
  }, [data, search, page]);

  return {
    ...filteredAndPaginatedData,
    isLoading,
    error,
  };
};