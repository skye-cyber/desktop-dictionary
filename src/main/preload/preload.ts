import { contextBridge, ipcRenderer } from 'electron';
import { ApiType } from './preload.type';



window.global = window;

contextBridge.exposeInMainWorld('global', window);

const api : ApiType = {
    getHint: (query: string)
    searchWord: (query: string) => ipcRenderer.invoke('search-word', query),
    getWordDetails: (word: string) => ipcRenderer.invoke('get-word-details', word),
}
