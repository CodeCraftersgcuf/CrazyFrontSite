import { useQuery } from '@tanstack/react-query';
import { Game } from '../data/types';

export const useSingleGameData = (category: string, id: string) => {
  const fetchGameData = async (): Promise<{ game: Game; relatedGames: Game[] }> => {
    // Handle category names with spaces by replacing spaces with empty string for file names
    const categoryFileName = category.replace(/\s+/g, '');
    const response = await fetch(`/data/Categories/${categoryFileName}Data.json`);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${categoryFileName}Data.json:`, response.status, response.statusText);
      throw new Error(`Failed to fetch game data: ${response.statusText} (${response.status})`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error('Non-JSON response received:', {
        url: `/data/Categories/${categoryFileName}Data.json`,
        contentType,
        responseText: text.substring(0, 500)
      });
      throw new Error(`Invalid JSON file: ${categoryFileName}Data.json - received HTML instead of JSON`);
    }

    try {
      const data: Game[] = await response.json();
      
      if (!Array.isArray(data)) {
        console.error(`Invalid data structure in ${categoryFileName}Data.json:`, data);
        throw new Error(`Invalid data format in ${categoryFileName}Data.json - expected array`);
      }

      if (data.length === 0) {
        console.error(`Empty data array in ${categoryFileName}Data.json`);
        throw new Error(`No games found in ${category} category`);
      }

      // Try to find game by ID first, then by title
      let game = data.find((g) => g.id === id);
      if (!game) {
        // Try matching by title (case-insensitive)
        game = data.find((g) => g.title.toLowerCase() === id.toLowerCase());
      }
      if (!game) {
        // Try partial title match
        game = data.find((g) => g.title.toLowerCase().includes(id.toLowerCase()));
      }

      if (!game) {
        console.error('Game not found:', {
          searchedId: id,
          category,
          availableGames: data.map(g => ({ id: g.id, title: g.title }))
        });
        throw new Error(`Game "${id}" not found in ${category} category`);
      }

      // Get 15 random games from the same category
      const relatedGames = data
        .filter((g) => g.id !== game!.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

      return { game, relatedGames };
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error(`Failed to parse ${categoryFileName}Data.json - invalid JSON format`);
    }
  };

  return useQuery({
    queryKey: ['game', category, id],
    queryFn: fetchGameData,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};