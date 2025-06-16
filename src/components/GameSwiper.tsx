import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { Game } from '../data/types';
import { GameCard } from './GameCard';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/grid';

interface GameSwiperProps {
  games: Game[];
  layout?: 'grid' | 'list' | 'featured';
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  rows?: number;
}

export const GameSwiper: React.FC<GameSwiperProps> = ({
  games,
  layout = 'grid',
  slidesPerView = 3,
  spaceBetween = 30,
  autoplay = false,
  rows = 2,
}) => {
  // if (layout === 'featured') {
  //   return (
  //     <div className="grid grid-cols-3 gap-6 h-[600px]">
  //       <div className="col-span-2 h-full">
  //         <GameCard game={games[0]} layout="featured" size="large" />
  //       </div>
  //       <div className="grid grid-rows-2 gap-6">
  //         <div className="grid grid-cols-1 gap-6">
  //           <GameCard game={games[1]} layout="featured" />
  //           <GameCard game={games[2]} layout="featured" />
  //         </div>
  //         <div className="grid grid-cols-1 gap-6">
  //           <GameCard game={games[3]} layout="featured" />
  //           <GameCard game={games[4]} layout="featured" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Grid]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      grid={layout === 'grid' ? {
        rows: rows,
        fill: 'row'
      } : undefined}
      navigation
      // pagination={{ clickable: true }}
      autoplay={autoplay ? { delay: Math.floor(Math.random() * (800 - 300 + 1)) + 300, disableOnInteraction: false } : false}
      // set breakpoint
      breakpoints={{
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      }}
      className={`w-full ${layout === 'grid' ? 'grid-swiper' : ''}`}
    >
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <GameCard game={game} layout={layout} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};