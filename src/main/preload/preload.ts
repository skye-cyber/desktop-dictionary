import { contextBridge } from 'electron';
import { ApiType, BookMark, BookmarkEntry, BookmarkMetadata } from './preload.type';
import { dictionaryService } from '../services/dictionaryService';
import { DictionaryEntry } from '../../types/global';
import fs from 'fs';
import { BOOKMARK_FILE } from '../shared';
import { getformatDateTime } from '../utils/datetime';


window.global = window;

contextBridge.exposeInMainWorld('global', window);

const api: ApiType = {
    getHint: (word: string): string[] => {
        return dictionaryService.hint(word);
    },
    searchWord: (query: string): DictionaryEntry | undefined => {
        return dictionaryService.search(query);
    },
    readFile: async (file: string): Promise<string | null> => {
        try {
            if (fs.statfsSync(file)) {
                const data: string = fs.readFileSync(file, 'utf-8')
                if (!data) return null;
                return data
            }
            return null
        } catch (err) {
            console.error(err)
            return null
        }
    },
    writeFile: async (data: string, file: string): Promise<boolean> => {
        try {
            if (data && file) {
                fs.writeFileSync(file, data)
                return true
            }
            return false
        } catch (err) {
            console.error(err)
            return false
        }
    },
    initBookmark: async (): Promise<BookMark> => {
        const bookmarks: BookMark = {
            metadata: {
                created_at: getformatDateTime(),
                update_at: null
            },
            bookmarks: []
        }
        await api.writeFile(JSON.stringify(bookmarks), BOOKMARK_FILE)
        return bookmarks
    },
    readBookmark: async (): Promise<BookmarkEntry[]> => {
        const data = await api.readFile(BOOKMARK_FILE)
        let bookmarks: BookMark
        try {
            if (!data) {
                bookmarks = await api.initBookmark()
                return []
            } else {
                bookmarks = JSON.parse(data)
                bookmarks.metadata.created_at = getformatDateTime()
                return bookmarks.bookmarks
            }
        } catch (err) {
            return []
        }
    },
    readBookmarkMeta: async (): Promise<BookmarkMetadata | null> => {
        const data = await api.readFile(BOOKMARK_FILE)
        if (!data) return null;
        try {
            const bookmarks: BookMark = JSON.parse(data)
            return bookmarks.metadata
        } catch (err) {
            return null
        }
    },
    updateBookmark: async (bookmark: BookmarkEntry[]): Promise<boolean> => {
        if (!bookmark) return false;
        try {
            const data = await api.readFile(BOOKMARK_FILE)
            let new_bookmark: BookMark
            if (!data) {
                new_bookmark = {
                    metadata: {
                        created_at: getformatDateTime(),
                        update_at: null
                    },
                    bookmarks: []
                }
            } else {
                new_bookmark = JSON.parse(data)
                new_bookmark.metadata.update_at = getformatDateTime()
            }
            new_bookmark.bookmarks = bookmark
            await api.writeFile(JSON.stringify(new_bookmark), BOOKMARK_FILE)
            return true
        } catch (err) { return false }
    },
    deleteBookmarkItem: async (phrase: string): Promise<BookmarkEntry[] | null> => {
        const data = await api.readFile(BOOKMARK_FILE)
        if (!data) return null;
        try {
            const bookmarks: BookMark = JSON.parse(data)
            const new_bookmarks: BookMark = {
                metadata: bookmarks.metadata,
                bookmarks: bookmarks.bookmarks.filter((item) => item.phrase !== phrase)
            }
            new_bookmarks.metadata.update_at = getformatDateTime()
            await api.writeFile(JSON.stringify(new_bookmarks), BOOKMARK_FILE)
            return new_bookmarks.bookmarks
        } catch (err) { return null }
    },
    addBookmarkItem: async (item: string): Promise<BookmarkEntry[] | null> => {
        const data = await api.readFile(BOOKMARK_FILE)
        try {
            const bookmarks: BookMark = data ? JSON.parse(data) : await api.initBookmark();

            // Check if item already exists
            if (!Boolean(bookmarks.bookmarks.find(i => i.phrase === item))) {
                bookmarks.bookmarks.push({
                    phrase: item,
                    added_at: getformatDateTime()
                })
                bookmarks.metadata.update_at = getformatDateTime()
                await api.writeFile(JSON.stringify(bookmarks), BOOKMARK_FILE)
            }
            return bookmarks.bookmarks
        } catch (err) { return null }
    }
}

contextBridge.exposeInMainWorld('dict', {
    api,
});
