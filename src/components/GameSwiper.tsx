import React from 'react';
import { Game } from '../data/types';
import { CustomGameSwiper } from './CustomGameSwiper';

interface GameSwiperProps {
  games: Game[];
  layout?: 'grid' | 'list' | 'featured';
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  rows?: number;
}

export const GameSwiper: React.FC<GameSwiperProps> = (props) => {
  return <CustomGameSwiper {...props} />;
};