import { useQuery } from '@tanstack/react-query';
import { Game } from '../data/types';

export const useSingleGameData = (category: string, titleOrId: string) => {
  const fetchGameData = async (): Promise<{ game: Game; relatedGames: Game[] }> => {
    const response = await fetch(`/data/Categories/${category}Data.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch game data: ${response.statusText}`);
    }

    const data: Game[] = await response.json();
    
    // Decode URL-encoded title and try to find game by title or id
    const decodedTitleOrId = decodeURIComponent(titleOrId);
    const game = data.find((g) => 
      g.title === decodedTitleOrId || 
      g.id === decodedTitleOrId ||
      g.title === titleOrId ||
      g.id === titleOrId
    );

    if (!game) {
      throw new Error(`Game not found: ${decodedTitleOrId}`);
    }

    // Get 15 random games from the same category
    const relatedGames = data
      .filter((g) => g.id !== game.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);

    return { game, relatedGames };
  };

  return useQuery({
    queryKey: ['game', category, titleOrId],
    queryFn: fetchGameData,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};