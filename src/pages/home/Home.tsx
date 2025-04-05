import React, { useMemo } from 'react'; // Import useMemo
import images from '../../constants/images'
import StaticCard from './components/StaticCard'
import { Game } from '../../data/types'
import { GameSwiper } from '../../components/GameSwiper'
import { useHomeData } from '../../queries/HomePage'
import HomePage from './components/HomePage'
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    // const [search, setSearch] = useState('');

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
    console.log(games);
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
                <p>{error instanceof Error ? error.message : 'Please try again later.'}</p>
                <p className="text-sm mt-2">Make sure the JSON file exists at: /src/data/home_data.json</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            {/* <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {
                    statics.map((item, index) => (
                        <StaticCard key={index} title={item.title} img={item.img} />
                    ))
                }
            </div>
            <div className='my-8'><HomePage firstFive={games} /></div>
            {Object.entries(groupedData).map(([categoryName, gamesInCategory]) => {
                if (gamesInCategory.length === 0) {
                    return null; // Don't render a section for empty categories
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
                            spaceBetween={20}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default Home