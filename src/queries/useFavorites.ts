import { useState, useEffect } from 'react';
import { Game } from '../data/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Game[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (game: Game) => {
    // Prevent duplicate favorites
    if (!favorites.some((fav) => fav.id === game.id)) {
      const newFavorites = [...favorites, game];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (gameId: string) => {
    const newFavorites = favorites.filter((game) => game.id !== gameId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const isFavorite = (gameId: string) => {
    return favorites.some((game) => game.id === gameId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
    isFavorite,
  };
};