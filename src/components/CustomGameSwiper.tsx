import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Game } from '../data/types';
import { GameCard } from './GameCard';

interface CustomGameSwiperProps {
  games: Game[];
  layout?: 'grid' | 'list' | 'featured';
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  rows?: number;
}

export const CustomGameSwiper: React.FC<CustomGameSwiperProps> = ({
  games,
  layout = 'grid',
  slidesPerView = 4,
  spaceBetween = 20,
  autoplay = false,
  rows = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(slidesPerView);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive breakpoints
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(slidesPerView);
      } else if (width >= 768) {
        setItemsPerView(Math.min(3, slidesPerView));
      } else if (width >= 640) {
        setItemsPerView(Math.min(2, slidesPerView));
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [slidesPerView]);

  // Calculate total slides needed for grid layout
  const totalItems = games.length;
  const itemsPerSlide = itemsPerView * rows;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [autoplay, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Stop autoplay on hover
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && totalSlides > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3000);
    }
  };

  if (!games || games.length === 0) {
    return <div>No games available</div>;
  }

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100'
            }`}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentIndex === totalSlides - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 ${
              currentIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100'
            }`}
            style={{ transform: 'translate(50%, -50%)' }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slides Container */}
      <div 
        ref={containerRef}
        className="overflow-hidden"
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const startIndex = slideIndex * itemsPerSlide;
            const slideGames = games.slice(startIndex, startIndex + itemsPerSlide);

            return (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0"
                style={{ minWidth: '100%' }}
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                    gridTemplateRows: rows > 1 ? `repeat(${rows}, 1fr)` : 'auto',
                    gap: `${spaceBetween}px`,
                  }}
                >
                  {slideGames.map((game, gameIndex) => (
                    <div key={`${slideIndex}-${gameIndex}`} className="p-2">
                      <GameCard game={game} layout={layout} />
                    </div>
                  ))}
                  
                  {/* Fill empty slots if needed */}
                  {slideGames.length < itemsPerSlide &&
                    Array.from({ length: itemsPerSlide - slideGames.length }).map((_, emptyIndex) => (
                      <div key={`empty-${slideIndex}-${emptyIndex}`} className="p-2" />
                    ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
