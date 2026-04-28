import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WordCard from '../components/WordCard';
import EmptyState from '../components/EmptyState';

interface DictionaryEntry {
    word: string;
    phonetic?: string;
    part_of_speech?: string;
    definition: string;
    example?: string;
}

const HomePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DictionaryEntry[]>([]);
    const [expandedWord, setExpandedWord] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Apply dark mode class to body
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setExpandedWord(null);
            return;
        }

        setIsLoading(true);
        try {
            const results = await window.electronAPI.searchWord(searchQuery);
            setResults(results);
            setExpandedWord(null);
        } catch (err) {
            console.error('Search error:', err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        setQuery(value);
        performSearch(value);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setExpandedWord(null);
    };

    const toggleDetails = (word: string) => {
        if (expandedWord === word) {
            setExpandedWord(null);
        } else {
            setExpandedWord(word);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-vimdark-100 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

            <div className="p-4 max-w-4xl mx-auto">
                <SearchBar
                    query={query}
                    onSearch={handleSearch}
                    onClear={clearSearch}
                    darkMode={darkMode}
                />

                <div className="mt-2 text-right">
                    <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-vimdark-400 rounded">Ctrl+K</kbd>
                </div>

                <main className="mt-6">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : results.length === 0 ? (
                        <EmptyState query={query} darkMode={darkMode} />
                    ) : (
                        <div className="space-y-4">
                            {results.map((entry) => (
                                <WordCard
                                    key={entry.word}
                                    entry={entry}
                                    isExpanded={expandedWord === entry.word}
                                    onToggle={() => toggleDetails(entry.word)}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-vimdark-500 mt-auto">
                <p>Desktop Dictionary - Advanced search with AI integration</p>
            </footer>
        </div>
    );
};

export default HomePage;