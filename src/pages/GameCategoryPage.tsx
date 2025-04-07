import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGameData } from '../queries/useGameData';
import { Gamepad2 } from 'lucide-react';

export const GameCategoryPage: React.FC = () => {
  const { category = '' } = useParams();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { games, totalPages, isLoading, error } = useGameData(
    category,
    search,
    currentPage
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Games</h2>
        <p>{error instanceof Error ? error.message : 'Please try again later.'}</p>
        <p className="text-sm mt-2">Make sure the JSON file exists at: /src/data/categories/{category}Data.json</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className='text-4xl'>
          {category} <br />
        </h1>
        <input
          type="text"
          placeholder="Search games..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game,index) => (
          <div key={index}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 
            flex gap-4 `}
          >
            <div
              className={`
              p-4 bg-center bg-cover bg-no-repeat cursor-pointer
              hover:[border-image:fill_0_linear-gradient(to_top,#000_20%,#0003)]
              w-full
            `}
              style={{
                backgroundImage: `url(${game.thumb})`,
                height: '200px'
              }}
            >
              <div className='opacity-0 hover:opacity-100 h-full flex flex-col justify-center items-center w-full'>
                <h3 className={`font-bold mb-2 text-xl `}>{game.title}</h3>
                <Link to={`/category/${game.category}/${game.title}`} className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Gamepad2 size={18} />
                  Play Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-800 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-800 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};