import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/Results';
import EmptyState from '../components/EmptyState';
import { PartialMatchCard } from '../components/PartialMatch';
import { AnimatePresence } from 'framer-motion';
import { DictionaryEntry } from '../../types/global';

const HomePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DictionaryEntry | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [PartialMatches, setPartialMatches] = useState<string[] | null>(null)

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults(null);
            return;
        }

        setIsLoading(true);
        try {
            const searchResult = window.dict.api.searchWord(searchQuery);
            if (searchResult) setResults(searchResult);
        } catch (err) {
            console.error('Search error:', err);
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    const hintOnType = async (searchQuery: string) => {
        setQuery(searchQuery)
        const hints = window.dict.api.getHint(searchQuery)
        setPartialMatches(hints)
    }

    const handleSearch = (value: string) => {
        setQuery(value);
        setPartialMatches(null)
        performSearch(value);
    };

    const clearSearch = () => {
        setQuery('');
        setResults(null);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 text-gray-900 dark:bg-vimdark-100 dark:text-white">
            <div className=''>
                <Header />
                <div className="p-0 max-w-4xl mx-auto">
                    <div className='relative'>
                        <SearchBar
                            query={query}
                            onSearch={handleSearch}
                            onClear={clearSearch}
                            onType={hintOnType}
                        />
                        {(PartialMatches && PartialMatches.length > 0) && (
                            <AnimatePresence>
                                <PartialMatchCard searchPhrase={query} matchPhrases={PartialMatches} onSelect={(hint) => {
                                    handleSearch(hint)
                                }} />
                            </AnimatePresence>
                        )}
                    </div>
                    <div className="text-right hidden">
                        <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-vimdark-400 rounded">Ctrl+K</kbd>
                    </div>
                </div>

                <main className="h-full overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : !results || !results.meanings ? (
                        <EmptyState query={query} />
                    ) : (
                        <ResultCard searchPhrase={query} results={results} />
                    )}
                </main>
            </div>

            <footer className="hidden text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-vimdark-500 mt-auto">
                <p>Desktop Dictionary - Advanced search with AI integration</p>
            </footer>
        </div>
    );
};

export default HomePage;
