import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import { DictionaryEntry, MeaningStructureType } from '../../types/global';


interface WordCardProps {
    entry: MeaningStructureType;
    searchPhrase: string;
}

export const WordCard: React.FC<WordCardProps> = ({ searchPhrase, entry }) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);

    const onExpand = () => {
        setExpanded(!isExpanded)
    }
    return (
        <motion.div
            layout
            className={`bg-white dark:bg-vimdark-200 rounded-lg shadow-sm border border-gray-200 dark:border-vimdark-500 overflow-hidden ${isExpanded ? 'm-1 ring-1 ring-blue-500' : ''
                }`}
        >
            <div className='p-4 cursor-pointer' onClick={onExpand}>
                <i className='text-sm flex'>{"("}
                    <h3 className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 cursor-auto">
                        {entry.type}
                    </h3>
                    {")"}
                </i>
                <div className='space-y-2 curs' onClick={onExpand}>
                    <div>
                        <div className="flex items-baseline justify-between">
                            <div>
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
                        <div className='mt-2'>
                            <h6 className="text-sm font-semibold">Def:</h6>
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 cursor-auto">
                                {entry.meaning}
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                key={`details-${searchPhrase}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-4 pb-4 overflow-hidden"
                            >

                                <div className="border-t border-gray-200 dark:border-vimdark-500 pt-4">
                                    {entry.other.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-1">Other:</h4>
                                            <div className='flex gap-2 flex-wrap'>
                                                {entry.other.map((meaning, index) => (
                                                    <div className='flex gap-1'>
                                                        <span className='text-xs bg-white dark:bg-[#414143] h-[13px] w-[13px] rounded-full flex justify-center items-center text-green-600 dark:text-white'>{index}</span>
                                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                            {meaning}
                                                        </p>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    )}

                                    {(entry.examples && entry.examples.length > 0) && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold mb-2">Example:</h4>
                                            {entry.examples.map((example) => {
                                                return (
                                                    <p className="text-gray-600 dark:text-gray-400 italic">
                                                        {example.substring(0, 1).toUpperCase()}{example.substring(1)}
                                                    </p>
                                                )
                                            })
                                            }
                                        </div>

                                    )}

                                    <div className="hidden mt-6 p-4 bg-gray-50 dark:bg-vimdark-400 rounded-lg">
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
                </div>
            </div>
        </motion.div>
    );
};


interface ResultType {
    searchPhrase: string;
    results: DictionaryEntry;
}

const ResultCard: React.FC<ResultType> = ({ searchPhrase, results }) => {
    return (
        <div className="block gap-4 space-y-4 bg-white dark:bg-vimdark-200 rounded-md p-2 h-[80vh]">
            <div className='flex justify-between mx-20 mb-2 border-b-2 dark:border-b-vimblue-900'>
                <div>
                    <h5 className="font-semibold text-gray-500 uppercase tracking-wide">
                        Synonyms
                    </h5>
                </div>
                <div>
                    <h5 className="font-semibold text-blue-600 dark:text-blue-400 cursor-auto">
                        <span className='text-lg font-semibold text-gray-500 uppercase tracking-wide'>Def: </span>
                        <span>{searchPhrase}</span>
                    </h5>
                </div>
                <div>
                    <h5 className="font-semibold text-gray-500 uppercase tracking-wide">
                        Antonyms
                    </h5>
                </div>
            </div>
            <section className='md:flex md:container justify-between gap-8'>
                <div className="flex justify-center mt-4 min-w-32 w-[50%] h-full max-h-[60vh] overflow-y-auto space-y-2 scrollbar-custom scroll-smooth">
                    <div className='text-gray-500 dark:text-gray-300 text-md ml-6'>
                        {results.synonyms.map((synonym, index) => (
                            <p key={index} className='flex items-center gap-1'>
                                <span className='h-[1px] w-[1px] bg-gray-300 dark:bg-orange-300 p-1 rounded-full'></span>
                                {synonym}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='min-w-[50%] h-fit max-h-[70vh] overflow-y-auto space-y-2 scrollbar-custom scroll-smooth pb-12'>
                    {results.meanings.map((entry, index) => (
                        <WordCard
                            key={index}
                            entry={entry}
                            searchPhrase={searchPhrase}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-4 min-w-32 w-[50%] h-full max-h-[60vh] overflow-y-auto space-y-2 scrollbar-custom scroll-smooth">
                    <div className='text-gray-500 dark:text-gray-300 text-md mr-6'>
                        {results.antonyms.map((antonym, index) => (
                            <p key={index} className='flex items-center gap-1'>
                                <span className='h-[1px] w-[1px] bg-gray-300 dark:bg-orange-300 p-1 rounded-full'></span>
                                {antonym.substring(0, 1).toUpperCase()}{antonym.substring(1)}
                            </p>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ResultCard;
