import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SearchMatch {
    searchPhrase: string
    matchPhrase: string
}

interface MatchPhrases {
    searchPhrase: string
    matchPhrases: Array<string>
}

export const PartialMatchCard: React.FC<MatchPhrases> =({searchPhrase, matchPhrases})=>{
    if(matchPhrases.length==0 || !searchPhrase) return
    return (
        <motion.div
            layout
            className="absolute top-12 mt-0.5 w-fit min-w-72 max-w-[70%] min-h-12 h-fit max-h-72 bg-white dark:bg-vimdark-200 rounded-lg shadow-sm border border-gray-200 dark:border-vimdark-500 overflow-x-hidden overflow-y-auto"
        >
            {matchPhrases.map((match, index)=>{
                return <PartialMatchPhrase key={index} searchPhrase={searchPhrase} matchPhrase={match}/>
            })}
        </motion.div>
        )
}

export const PartialMatchPhrase: React.FC<SearchMatch> =({searchPhrase, matchPhrase})=>{
    const [rmatch, setRmatch] = useState<string|null>(null)
    const [unmatched, setUnmatched] = useState<string|null>(null)

    if(!searchPhrase || !matchPhrase) return

    // Split to matched and umatched string
    useEffect(()=>{
        setUnmatched(matchPhrase.split(searchPhrase, 2)[1])
        setRmatch(searchPhrase)
    })

    if(searchPhrase > matchPhrase) return

    return (
        <motion.div onClick={()=>{}} className='px-3 text-sm flex cursor-pointer py-2 dark:hover:bg-vimdark-400'>
            <div className='text-green-500'>{rmatch}</div>{unmatched}<div></div>
        </motion.div>
    )
}
