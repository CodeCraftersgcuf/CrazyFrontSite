import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleGameData } from '../queries/useSingleGameData';
import { useFavorites } from '../queries/useFavorites';
import { toast } from 'react-toastify';
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
  // Decode the URL parameter and handle both ID and title matching
  const decodedId = decodeURIComponent(id);
  const { data, isLoading, error } = useSingleGameData(category, decodedId);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const fullscreenRef = useRef<HTMLDivElement | null>(null); // Ref for the fullscreen container
  const instructionsRef = useRef<HTMLDivElement | null>(null); // Ref for the instructions div

  // Keep fullscreen state in sync if user presses ESC
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Cross-browser fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const el = fullscreenRef.current as any;
      if (el?.requestFullscreen) el.requestFullscreen();
      else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el?.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
      else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen();
    }
    // Don't setIsFullscreen here, let the event handle it
  };

  const handleShowInstructions = () => {
    setShowInstructions((prev) => {
      if (!prev && instructionsRef.current) {
        // If about to open, scroll into view
        setTimeout(() => {
          instructionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
      return !prev;
    });
  };

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(game.id);
      toast.success(`${game.title} removed from favorites!`);
    } else {
      addFavorite(game);
      toast.success(`${game.title} added to favorites!`);
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
    console.log('Error details:', error);
    console.log('Category:', category, 'ID/Title:', decodedId);
    return (
      <div className="text-red-500 text-center p-4">
        <h2 className="text-xl font-bold mb-2">
          Error Loading Game
        </h2>
        <p>Sorry, the game is currently under maintenance. Please try again later.</p>
        <div className="mt-4 text-sm">
          <p>Debug info:</p>
          <p>Category: {category}</p>
          <p>Game ID/Title: {decodedId}</p>
          <p>Error: {error ? (error as Error).message : String(error)}</p>
        </div>
      </div>
    );
  }

  const { game, relatedGames } = data;
  const favorite = isFavorite(game.id);
  const tagsArray = (game.tags || '').split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  return (
    <div
      ref={fullscreenRef}
      className={`min-h-screen bg-gray-900 text-white p-4 ${isFullscreen ? 'fullscreen' : ''}`}
      style={isFullscreen ? { height: '100vh', width: '100vw', overflow: 'auto' } : {}}
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
                  aria-label="Instructions"
                >
                  <Info size={24} />
                </button>
                <button
                  onClick={handleFavoriteToggle}
                  className="p-2 rounded-full hover:bg-gray-700"
                  title={favorite ? 'Remove from favorites' : 'Add to favorites'}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
              <Heart 
                    size={24} 
                    className={`transition-all duration-200 ${
                      favorite 
                        ? 'fill-purple-600 text-purple-600 scale-110' 
                        : 'text-gray-300 hover:text-purple-400'
                    }`}
                  />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full hover:bg-gray-700"
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
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
            <div
              className="relative overflow-hidden"
              style={{
                paddingBottom: isFullscreen ? '0' : '56.25%',
                height: isFullscreen ? '80vh' : undefined,
                minHeight: 280,
                background: '#191e2b'
              }}
            >
              <iframe
                src={game.url}
                title={game.title}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                scrolling="no"
              />
            </div>
          </div>
          <div className="my-4 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <div className='flex flex-col lg:flex-row gap-2 my-2'>
              <p className='opacity-50 text-nowrap'>Description :-</p>
              <p>{game.description}</p>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 my-2'>
              <p className='opacity-50 text-nowrap pr-12'>Tags :-</p>
              <div className='flex flex-wrap gap-4'>
                {tagsArray.map((tag, index) => (
                  <span key={tag + index} className="bg-[#101828] text-white p-2 rounded-sm text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {!isFullscreen && (
          <div className="w-1/4">
            <h2 className="text-xl font-bold mb-4">Related Games</h2>
            <div className="grid gap-4">
              {relatedGames && relatedGames.length > 0 ? (
                relatedGames.map((relatedGame, idx) => (
                  <a
                    key={relatedGame.id || relatedGame.title + idx}
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
                ))
              ) : (
                <div className="text-gray-400 text-sm">No related games found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
