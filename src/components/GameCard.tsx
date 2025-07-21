import React, { useState } from 'react';
import { Game } from '../data/types';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
  layout?: 'grid' | 'list' | 'featured';
  size?: 'small' | 'large';
}

export const GameCard: React.FC<GameCardProps> = ({ game, layout = 'grid', size = 'small' }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // const isGrid = layout === 'grid';
  const isList = layout === 'list';
  const isFeatured = layout === 'featured';
  const isLarge = size === 'large';

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 
        ${isList ? 'flex gap-4' : 'w-full'} 
        ${isFeatured && isLarge ? 'h-full' : ''}`}
    >
      <div
        className="relative w-full"
        style={{
          height: isLarge ? '500px' : '200px'
        }}
      >
        {/* Loading Spinner */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Background Image Container */}
        <div
          className="w-full h-full bg-center bg-cover bg-no-repeat relative cursor-pointer"
          style={{
            backgroundImage: !imageError && !imageLoading ? `url(${game.thumb})` : 'none',
            backgroundColor: imageError || imageLoading ? '#f3f4f6' : 'transparent'
          }}
        >
          {/* Hidden img tag for loading detection */}
          <img
            src={game.thumb}
            alt={game.title}
            className="hidden"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Error State */}
          {imageError && !imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="text-center text-gray-500">
                <Gamepad2 size={32} className="mx-auto mb-2" />
                <span className="text-sm">Image not available</span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          {!imageLoading && !imageError && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <div className='opacity-0 hover:opacity-100 transition-opacity duration-300 text-center p-4'>
                <h3 className={`font-bold mb-3 text-white ${isLarge ? 'text-2xl' : 'text-xl'}`}>{game.title}</h3>
                <Link 
                  to={`/category/${game.category}/${game.title}`} 
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Gamepad2 size={18} />
                  Play Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};