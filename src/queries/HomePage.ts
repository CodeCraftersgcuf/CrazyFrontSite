import { useQuery } from '@tanstack/react-query';
import { Game } from '../data/types';



export const useHomeData = (search: string = '') => {
  const fetchHomeData = async (): Promise<Game[]> => {
    const response = await fetch('/data/home_data.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch home data: ${response.statusText}`);
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
      throw new Error('Failed to parse home data');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['home-games'],
    queryFn: fetchHomeData,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Filter data based on search term if provided
  const filteredGames = search && data 
    ? data.filter(game => 
        game.title.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return {
    games: filteredGames || [],
    isLoading,
    error,
  };
};