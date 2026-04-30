import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WordCard from '../components/WordCard';
import EmptyState from '../components/EmptyState';
import { PartialMatchCard } from '../components/PartialMatch';
import { AnimatePresence } from 'framer-motion';
import { DictionaryEntry } from '../../types/global';

const HomePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DictionaryEntry[]>([]);
    const [expandedWord, setExpandedWord] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [PartialMatches, setPartialMatches] = useState<string[] | null>(null)

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setExpandedWord(null);
            return;
        }

        setIsLoading(true);
        try {
            // const results = await window.electronAPI.searchWord(searchQuery);
            setResults([{
                word: query,
                phonetic: "/sdsi/",
                part_of_speech: "ssp",
                definition: "greetings",
                example: "hello there!"
            }]);
            setExpandedWord(null);
        } catch (err) {
            console.error('Search error:', err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const hintOnType = async (searchQuery: string) => {
        setQuery(searchQuery)
        setPartialMatches(["hell", "hello", "helloah"])
    }

    const handleSearch = (value: string) => {
        setQuery(value);
        setPartialMatches(null)
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
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-vimdark-100 dark:text-white">
            <Header />
            <div className="p-4 max-w-4xl mx-auto">
                <div className='relative'>
                    <SearchBar
                        query={query}
                        onSearch={handleSearch}
                        onClear={clearSearch}
                        onType={hintOnType}
                    />
                    {(PartialMatches && PartialMatches.length > 0) && (
                        <AnimatePresence>
                            <PartialMatchCard searchPhrase={query} matchPhrases={PartialMatches} />
                        </AnimatePresence>
                    )}
                </div>

                <div className="mt-2 text-right">
                    <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-vimdark-400 rounded">Ctrl+K</kbd>
                </div>

                <main className="mt-6">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : results.length === 0 ? (
                        <EmptyState query={query} />
                    ) : (
                        <div className="space-y-4">
                            {results.map((entry) => (
                                <WordCard
                                    key={query}
                                    entry={entry}
                                    isExpanded={expandedWord === query}
                                    onToggle={() => toggleDetails(query)}
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
