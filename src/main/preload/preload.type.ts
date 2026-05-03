// import path from 'path';
// import fs from 'fs';

import { DictionaryEntry } from "../../types/global";


export enum ThemeType {
    dark = 'dark',
    light = 'light'
}

export interface BookmarkEntry {
    phrase: string
    added_at: string
}

export interface BookmarkMetadata {
    created_at: string | null
    update_at: string | null
    length?: number
}

export interface BookMark {
    metadata: BookmarkMetadata
    bookmarks: BookmarkEntry[]
}

export interface ApiType {
    isPackaged: () => Promise<boolean>,
    getHint: (query: string) => Promise<string[]>;
    searchWord: (query: string) => Promise<DictionaryEntry | undefined>;
    readFile: (file: string) => Promise<string | null>;
    writeFile: (data: string, file: string) => Promise<boolean>;
    initBookmark: () => Promise<BookMark>;
    readBookmark: () => Promise<BookmarkEntry[]>;
    readBookmarkMeta: () => Promise<BookmarkMetadata | null>;
    updateBookmark: (bookmark: BookmarkEntry[]) => Promise<boolean>;
    deleteBookmarkItem: (item: string) => Promise<BookmarkEntry[] | null>;
    addBookmarkItem: (item: string) => Promise<BookmarkEntry[] | null>;
}


declare global {
    interface Window {
        global: Window;
        dict: {
            api: ApiType;
        };
    }
}
