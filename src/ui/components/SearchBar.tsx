import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
    query: string;
    onSearch: (value: string) => void;
    onClear: () => void;
    darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, onClear, darkMode }) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClear();
        }
    };

    return (
        <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
            </div>
            <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for words... (Ctrl+K)"
                className={`w-full pl-10 pr-10 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                        ? 'bg-vimdark-300 border-vimdark-500 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                }`}
            />
            <AnimatePresence>
                {query && (
                    <motion.button
                        key="clear-button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        title="Clear search"
                    >
                        <FiX className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;