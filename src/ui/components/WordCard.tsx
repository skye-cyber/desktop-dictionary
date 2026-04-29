import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

interface DictionaryEntry {
    word: string;
    phonetic?: string;
    part_of_speech?: string;
    definition: string;
    example?: string;
}

interface WordCardProps {
    entry: DictionaryEntry;
    isExpanded: boolean;
    onToggle: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ entry, isExpanded, onToggle }) => {
    return (
        <motion.div
            layout
            className={`bg-white dark:bg-vimdark-200 rounded-lg shadow-sm border border-gray-200 dark:border-vimdark-500 overflow-hidden ${
                isExpanded ? 'ring-2 ring-blue-500' : ''
            }`}
        >
            <div
                className="p-4 cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex items-baseline justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                            {entry.word}
                        </h3>
                        {entry.phonetic && (
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {entry.phonetic}
                            </p>
                        )}
                    </div>
                    {entry.part_of_speech && (
                        <span className="text-xs bg-blue-100 dark:bg-vimblue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                            {entry.part_of_speech}
                        </span>
                    )}
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                    {entry.definition}
                </p>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key={`details-${entry.word}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 overflow-hidden"
                    >
                        <div className="border-t border-gray-200 dark:border-vimdark-500 pt-4">
                            <h4 className="font-semibold mb-2">Definition:</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {entry.definition}
                            </p>

                            {entry.example && (
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2">Example:</h4>
                                    <p className="text-gray-600 dark:text-gray-400 italic">
                                        "{entry.example}"
                                    </p>
                                </div>
                            )}

                            {/* Placeholder for advanced features */}
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h5 className="font-medium text-gray-500 uppercase tracking-wide mb-2">
                                        Synonyms
                                    </h5>
                                    <p className="text-gray-400 dark:text-gray-500">
                                        Coming soon...
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-500 uppercase tracking-wide mb-2">
                                        Antonyms
                                    </h5>
                                    <p className="text-gray-400 dark:text-gray-500">
                                        Coming soon...
                                    </p>
                                </div>
                            </div>

                            {/* AI Integration Point */}
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-vimdark-400 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FiZap className="text-yellow-500" />
                                        <span className="font-medium">AI Insights</span>
                                    </div>
                                    <span className="text-xs bg-yellow-100 dark:bg-vimblue-700 text-yellow-600 dark:text-yellow-300 px-2 py-1 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    AI-powered explanations and usage examples will appear here
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default WordCard;
