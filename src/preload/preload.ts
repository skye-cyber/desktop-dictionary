import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    searchWord: (query: string) => ipcRenderer.invoke('search-word', query),
    getWordDetails: (word: string) => ipcRenderer.invoke('get-word-details', word),
});