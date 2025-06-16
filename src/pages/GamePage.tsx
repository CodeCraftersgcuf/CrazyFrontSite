import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleGameData } from '../queries/useSingleGameData';
import { useFavorites } from '../queries/useFavorites';
import {
  Gamepad2,
  Heart,
  HeartOff,
  Maximize2,
  Minimize2,
  Info
} from 'lucide-react';

export const GamePage: React.FC = () => {
  const { category = '', id = '' } = useParams();
  const { data, isLoading, error } = useSingleGameData(category, id);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const fullscreenRef = useRef<HTMLDivElement | null>(null); // Ref for the fullscreen container

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen mode
      if (fullscreenRef.current?.requestFullscreen) {
        fullscreenRef.current.requestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  const instructionsRef = useRef<HTMLDivElement | null>(null); // Create a ref for the instructions div

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
    if (!showInstructions && instructionsRef.current) {
      instructionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !data) {
    console.log(error);
    return (
      <div className="text-red-500 text-center p-4">
        <h2 className="text-xl font-bold mb-2">
          Error Loading Game
        </h2>
        <p>Sorry, the game is currently under maintenance. Please try again later.</p>
        <div>
          <p>{error ? (error as Error).message : String(error)}</p>
        </div>
      </div>
    );
  }
  const { game, relatedGames } = data;
  const favorite = isFavorite(game.id);
  const tagsArray = game.tags.split(',') // Split by comma
    .map(tag => tag.trim()) // Remove leading/trailing whitespace from each item
    .filter(tag => tag !== '');

  return (
    <div
      ref={fullscreenRef} // Attach the ref to the main container
      className={`min-h-screen bg-gray-900 text-white p-4 ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div className={`flex ${isFullscreen ? 'flex-col' : 'flex-row gap-4'}`}>
        <div className={`${isFullscreen ? 'w-full' : 'w-3/4'}`}>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{game.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleShowInstructions}
                  className="p-2 rounded-full hover:bg-gray-700"
                  title="Instructions"
                >
                  <Info size={24} />
                </button>
                <button
                  onClick={() => (favorite ? removeFavorite(game.id) : addFavorite(game))}
                  className="p-2 rounded-full hover:bg-gray-700"
                  title={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorite ? <HeartOff size={24} /> : <Heart size={24} />}
                </button>
                <button
                  onClick={toggleFullscreen} // Use the toggleFullscreen function
                  className="p-2 rounded-full hover:bg-gray-700"
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                </button>
              </div>
            </div>
            {showInstructions && (
              <div className="mb-4 bg-gray-700 p-4 rounded-lg" ref={instructionsRef}>
                <h2 className="text-xl font-bold mb-2">How to Play</h2>
                <p>{game.instructions}</p>
              </div>
            )}
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={game.url}
                className="absolute top-0 left-0 w-full rounded-lg"
                style={{ height: isFullscreen ? 'calc(100% - 100px)' : '100%' }}
                allowFullScreen
              />
            </div>
          </div>
          <div className="my-4 bg-gray-700 p-4 rounded-lg" ref={instructionsRef}>
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <div className='flex flex-col lg:flex-row gap-2 my-2'>
              <p className='opacity-50 text-nowrap'>Description :-</p>
              <p>{game.description}</p>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 my-2'>
              <p className='opacity-50 text-nowrap pr-12'>Tags :-</p>
              <div className='flex flex-wrap gap-4'>
                {
                  tagsArray.map((tag, index) => (
                    <span key={index} className="bg-[#101828] text-white p-2 rounded-sm text-sm">
                      {tag}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        {!isFullscreen && (
          <div className="w-1/4">
            <h2 className="text-xl font-bold mb-4">Related Games</h2>
            <div className="grid gap-4">
              {relatedGames.map((relatedGame) => (
                <a
                  key={relatedGame.id}
                  href={`/category/${category}/${relatedGame.title}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={relatedGame.thumb}
                      alt={relatedGame.title}
                      className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="mt-2 font-semibold group-hover:text-blue-400 transition-colors">
                    {relatedGame.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};