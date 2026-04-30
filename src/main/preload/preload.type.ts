// import path from 'path';
// import fs from 'fs';

import { DictionaryEntry } from "../../types/global";


export enum ThemeType {
    dark = 'dark',
    light = 'light'
}

export interface ApiType {
    getHint: (query: string) => string[],
    searchWord: (query: string) => DictionaryEntry | undefined,
    // getWordDetails: (word: string) => any,
}


declare global {
    interface Window {
        global: Window;
        dict: {
            api: ApiType;
        };
    }
}
