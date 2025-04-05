import React from 'react'
import { Game } from '../../../data/types'
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface props {
    firstFive: Game[]
}

const HomePage: React.FC<props> = ({ firstFive }) => {
    function shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array; // Return the shuffled array (though it's shuffled in place)
    }

    function getRandomGamesUniqueCategory(gamesArray: Game[], count = 7) {

        // --- 1. Input Validation ---
        if (!Array.isArray(gamesArray)) {
            console.error("Error: Input 'gamesArray' must be an array.");
            return [];
        }
        if (gamesArray.length === 0) {
            console.warn("Warning: Input 'gamesArray' is empty.");
            return [];
        }
        if (typeof count !== 'number' || count <= 0) {
            console.error("Error: 'count' must be a positive number.");
            return [];
        }


        // --- 2. Group Games by Category ---
        const gamesByCategory: Record<string, Game[]> = {};
        gamesArray.forEach(game => {
            // Ensure the game object and category exist
            if (typeof game === 'object' && game !== null && typeof game.category === 'string') {
                const category = game.category;
                if (!gamesByCategory[category]) {
                    gamesByCategory[category] = []; // Initialize array for new category
                }
                gamesByCategory[category].push(game); // Add game to its category list
            } else {
                console.warn("Skipping invalid game object or missing category:", game);
            }
        });

        // --- 3. Check if Enough Unique Categories Exist ---
        const uniqueCategories = Object.keys(gamesByCategory);
        if (uniqueCategories.length < count) {
            console.warn(`Warning: Only ${uniqueCategories.length} unique categories found, but ${count} were requested. Cannot fulfill the request.`);
            return []; // Not possible to select 'count' items with unique categories
        }

        // --- 4. Shuffle the Unique Categories (Fisher-Yates Algorithm) ---
        // (Helper function defined below or use a library like lodash _.shuffle)
        const shuffledCategories = shuffleArray([...uniqueCategories]); // Shuffle a copy

        // --- 5. Select 'count' Random Categories ---
        const selectedCategoryNames = shuffledCategories.slice(0, count);

        // --- 6. Pick One Random Game from Each Selected Category ---
        const resultGames: Game[] = [];
        selectedCategoryNames.forEach((categoryName: string) => {
            const gamesInThisCategory = gamesByCategory[categoryName];
            if (gamesInThisCategory && gamesInThisCategory.length > 0) {
                const randomIndex = Math.floor(Math.random() * gamesInThisCategory.length);
                resultGames.push(gamesInThisCategory[randomIndex]);
            }
            // This else condition shouldn't happen if grouping worked correctly, but added for safety
            else {
                console.warn(`Warning: No games found for selected category '${categoryName}' during final selection.`);
            }
        });

        return resultGames;
    }
    const data = getRandomGamesUniqueCategory(firstFive);
    if (firstFive.length < 1) return ;
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12'>
            <div className={`col-span-1 lg:col-span-4 p-2`}>
                <div
                    className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex gap-4 h-full`}>
                    <div
                        className={`
                            p-4 bg-center bg-cover bg-no-repeat cursor-pointer
                            hover:[border-image:fill_0_linear-gradient(to_top,#000_20%,#0003)]
                            w-full
                        `}
                        style={{
                            backgroundImage: `url(${data[0].thumb})`,
                        }}
                    >
                        <div className='opacity-0 hover:opacity-100 h-full flex flex-col justify-end items-end p-4 w-full'>
                            <h3 className={`font-bold mb-2 text-xl`}>{data[0].title}</h3>
                            <Link to={`/category/${data[0].category}/${data[0].title}`} className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                <Gamepad2 size={18} />
                                Play Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2'>
                {
                    data.splice(1).map((item, index) => (
                        <div key={index}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex gap-4 h-[200px]`}>
                            <div
                                className={`
                            p-4 bg-center bg-cover bg-no-repeat cursor-pointer
                            hover:[border-image:fill_0_linear-gradient(to_top,#000_20%,#0003)]
                            w-full
                        `}
                                style={{
                                    backgroundImage: `url(${item.thumb})`,
                                }}
                            >
                                <div className='opacity-0 hover:opacity-100 h-full flex flex-col justify-center items-center w-full'>
                                    <h3 className={`font-bold mb-2 text-xl`}>{item.title}</h3>
                                    <Link to={`/category/${item.category}/${item.title}`} className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                        <Gamepad2 size={18} />
                                        Play Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage