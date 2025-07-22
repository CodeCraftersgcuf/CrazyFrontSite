import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Gamepad2 } from 'lucide-react';
import { useGameSearch } from '../queries/useGameSearch';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showDropdown?: boolean;
  onGameSelect?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search games...", 
  className = "",
  showDropdown = true,
  onGameSelect
}) => {
  const { searchQuery, setSearchQuery, searchResults, isSearching, hasResults } = useGameSearch();
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.length > 0 && showDropdown);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleGameClick = () => {
    setIsOpen(false);
    setSearchQuery('');
    onGameSelect?.();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(searchQuery.length > 0 && showDropdown)}
          className="w-full pl-10 pr-10 py-2 bg-[#373952] text-white placeholder-gray-400 rounded-full outline-none border-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1F2030] border border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : hasResults ? (
            <>
              <div className="p-3 border-b border-gray-600">
                <p className="text-sm text-gray-400">
                  Found {searchResults.length} game{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((game) => (
                  <Link
                    key={game.id}
                    to={`/category/${encodeURIComponent(game.category)}/${encodeURIComponent(game.title)}`}
                    onClick={handleGameClick}
                    className="flex items-center gap-3 p-3 hover:bg-[#373952] transition-colors border-b border-gray-700 last:border-b-0"
                  >
                    <div className="flex-shrink-0">
                      {game.thumb ? (
                        <img
                          src={game.thumb}
                          alt={game.title}
                          className="w-12 h-12 rounded object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                          <Gamepad2 size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{game.title}</h3>
                      <p className="text-sm text-gray-400 capitalize">{game.category}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Gamepad2 size={16} className="text-blue-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : searchQuery.trim() ? (
            <div className="p-4 text-center text-gray-400">
              <Gamepad2 size={24} className="mx-auto mb-2" />
              <p>No games found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try searching with different keywords</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
