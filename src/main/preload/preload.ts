import { contextBridge } from 'electron';
import { ApiType } from './preload.type';
import { dictionaryService } from '../services/dictionaryService';
import { DictionaryEntry } from '../../types/global';


window.global = window;

contextBridge.exposeInMainWorld('global', window);

const api: ApiType = {
    getHint: (word: string): string[] => {
        return dictionaryService.hint(word);
    },
    searchWord: (query: string): DictionaryEntry | undefined => {
        return dictionaryService.search(query);
    },
}

contextBridge.exposeInMainWorld('dict', {
    api,
});
