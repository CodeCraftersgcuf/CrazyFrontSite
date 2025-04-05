import React from 'react';
import { Game } from '../data/types';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
  layout?: 'grid' | 'list' | 'featured';
  size?: 'small' | 'large';
}

export const GameCard: React.FC<GameCardProps> = ({ game, layout = 'grid', size = 'small' }) => {
  // const isGrid = layout === 'grid';
  const isList = layout === 'list';
  const isFeatured = layout === 'featured';
  const isLarge = size === 'large';

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 
        ${isList ? 'flex gap-4' : 'w-full'} 
        ${isFeatured && isLarge ? 'h-full' : ''}`}
    >
      <div
        className={`
          p-4 bg-center bg-cover bg-no-repeat cursor-pointer
          hover:[border-image:fill_0_linear-gradient(to_top,#000_20%,#0003)]
          w-full
        `}
        style={{
          backgroundImage: `url(${game.thumb})`,
          height: isLarge ? '500px' : '200px'
        }}
      >
        <div className='opacity-0 hover:opacity-100 h-full flex flex-col justify-center items-center w-full'>
          <h3 className={`font-bold mb-2 ${isLarge ? 'text-2xl' : 'text-xl'}`}>{game.title}</h3>
          <Link to={`/category/${game.category}/${game.title}`} className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Gamepad2 size={18} />
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};