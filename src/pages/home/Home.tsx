import React, { useMemo } from 'react';
import images from '../../constants/images'
import StaticCard from './components/StaticCard'
import { Game } from '../../data/types'
import { GameSwiper } from '../../components/GameSwiper'
import { useHomeData } from '../../queries/HomePage'
import HomePage from './components/HomePage'
import SearchBar from '../../components/SearchBar'
import { useGameSearch } from '../../queries/useGameSearch'
import { GameCard } from '../../components/GameCard'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const { searchQuery, searchResults, hasResults } = useGameSearch();

    const statics = [
        {
            title: '4000+ games',
            img: images.games
        },
        {
            title: 'No install needed',
            img: images.shuttle
        },
        {
            title: 'Play with friends',
            img: images.battle
        },
        {
            title: 'All for free',
            img: images.stars
        },
    ]
    
    const { games, isLoading, error } = useHomeData('');

    function groupGamesByCategory(gamesArray: Game[]): Record<string, Game[]> {
        // Input validation
        if (!Array.isArray(gamesArray)) {
            console.error("Error: Input must be an array.");
            return {}; // Return empty object for invalid input
        }

        return gamesArray.reduce((accumulator, currentGame) => {
            // Check if the current item is a valid object with a string category
            if (typeof currentGame !== 'object' || currentGame === null) {
                // console.warn("Skipping invalid item (not an object):", currentGame);
                return accumulator; // Skip non-object items
            }
            if (typeof currentGame.category !== 'string' || currentGame.category.trim() === '') {
                // console.warn("Skipping item with invalid or missing category:", currentGame);
                // Optionally group these under a specific key like 'Uncategorized'
                // const category = 'Uncategorized';
                return accumulator; // Or skip items without a valid category
            }

            const category = currentGame.category;

            // If the category key doesn't exist in the accumulator yet, create it with an empty array
            if (!accumulator[category]) {
                accumulator[category] = [];
            }

            // Push the current game object into the array for its category
            accumulator[category].push(currentGame);

            // Return the accumulator for the next iteration
            return accumulator;
        }, {} as Record<string, Game[]>); // Initialize the accumulator as an empty object with explicit type
    }
    const groupedData = useMemo(() => {
        console.log("Recalculating grouped data..."); // Add log to see when it runs
        if (!games) return {}; // Handle case where games might be initially null/undefined
        return groupGamesByCategory(games);
    }, [games]); // Dependency array: Recalculate only when 'games' changes

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
                <p>{error.message || String(error)}</p>
            </div>
        );
    }

    // Show search results if user is searching
    if (searchQuery.trim() && hasResults) {
        return (
            <div className='flex flex-col gap-6'>
                <div className="mb-6">
                    <SearchBar 
                        placeholder="Search games..." 
                        className="w-full"
                        showDropdown={false}
                    />
                </div>
                
                <div>
                    <h2 className='text-2xl font-bold mb-4'>
                        Search Results for "{searchQuery}" ({searchResults.length} found)
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {searchResults.map((game) => (
                            <GameCard 
                                key={game.id} 
                                game={game} 
                                layout="grid" 
                                size="small" 
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Show "no results" if searching but no results found
    if (searchQuery.trim() && !hasResults) {
        return (
            <div className='flex flex-col gap-6'>
                <div className="mb-6">
                    <SearchBar 
                        placeholder="Search games..." 
                        className="w-full"
                        showDropdown={false}
                    />
                </div>
                
                <div className="text-center py-12">
                    <h2 className='text-2xl font-bold mb-4'>No Games Found</h2>
                    <p className="text-gray-400 mb-6">
                        No games found for "{searchQuery}". Try searching with different keywords.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Browse All Games
                    </button>
                </div>
            </div>
        );
    }

    // Default home page content
    return (
        <div className='flex flex-col gap-4'>
            <div className="mb-6 lg:hidden">
                <SearchBar 
                    placeholder="Search games..." 
                    className="w-full"
                />
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {statics.map((item, index) => (
                    <StaticCard key={index} title={item.title} img={item.img} />
                ))}
            </div>
            
            <div className='my-8'>
                <HomePage firstFive={games} />
            </div>
            
            {Object.entries(groupedData).map(([categoryName, gamesInCategory]) => {
                if (gamesInCategory.length === 0) {
                    return null;
                }
                return (
                    <div key={categoryName} style={{ marginBottom: '30px' }}>
                        <div className='flex items-center justify-between mb-4'>
                            <h1 className='text-2xl font-medium'>{categoryName}</h1>
                            <Link to={`/category/${categoryName}`} className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>
                                View All
                            </Link>
                        </div>
                        <GameSwiper
                            games={gamesInCategory}
                            layout="list"
                            slidesPerView={4}
                            spaceBetween={16}
                            autoplay={false}
                            rows={1}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default Home