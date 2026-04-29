import React from 'react';
import { FiSearch, FiStar, FiZap } from 'react-icons/fi';

interface EmptyStateProps {
    query: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ query }) => {
    if (query) {
        return (
            <div className="text-center py-12">
                <FiSearch className="mx-auto text-6xl text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
            </div>
        );
    }

    return (
        <div className="text-center py-12">
            <FiSearch className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Start typing to search for words</p>
            <div className="mt-4 flex justify-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <FiZap />
                    <span>Fast search</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <FiStar />
                    <span>Comprehensive definitions</span>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
