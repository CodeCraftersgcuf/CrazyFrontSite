import React from 'react'
import { useFavorites } from '../queries/useFavorites'
import { toast } from 'react-toastify';
import { GameCard } from '../components/GameCard';
import { Link } from 'react-router-dom';
import { Gamepad2, Trash2Icon } from 'lucide-react';
import { Game } from '../data/types';

const Favorite: React.FC = () => {
  const { favorites, removeAllFavorites, removeFavorite } = useFavorites();
  const handleRemoveAll = () => {
    removeAllFavorites();
    toast.success('All favorites removed successfully!');
  }
  const handleRemove = (favorite: Game) => {
    removeFavorite(favorite.id);
    toast.success(`${favorite.title} removed successfully!`);
  }
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Favorite</h2>
        <button
          onClick={handleRemoveAll}
          className='bg-[#7159D6] py-2 px-8 rounded-full hover:bg-[#7159D6]/80 text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer'
        >
          <Trash2Icon size={18}  color='white'  />
          Remove All
        </button>
      </div>
      {favorites.length < 1 &&  <h1 className='text-center text-xl'>No Game Found</h1>}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {
          favorites.length > 0 && (
            favorites.map((favorite, index) => (
              <div key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex gap-4 h-[150px]`}>
                <div
                  className={`
                            p-4 bg-center bg-cover bg-no-repeat cursor-pointer
                            hover:[border-image:fill_0_linear-gradient(to_top,#000_20%,#0003)]
                            w-full
                        `}
                  style={{
                    backgroundImage: `url(${favorite.thumb})`,
                  }}
                >
                  <div className='opacity-0 hover:opacity-100 h-full flex flex-col justify-center items-center p-1 w-full'>
                    <h3 className={`font-bold mb-2 text-xl`}>{favorite.title}</h3>
                    <div className='flex items-center gap-4 text-sm'>
                      <Link to={`/category/${favorite.category}/${favorite.title}`} className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <Gamepad2 size={18} />
                        Play Now
                      </Link>
                      <button onClick={() => handleRemove(favorite)} className='bg-[red] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer'>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default Favorite