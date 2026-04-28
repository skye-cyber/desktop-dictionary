import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import path from 'path';
import DictionaryService from '../services/dictionaryService';

const isDev = process.env.NODE_ENV === 'development';
let mainWindow: Electron.BrowserWindow | null = null;
let dictionaryService: DictionaryService;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: 'hiddenInset',
        show: false,
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    dictionaryService = new DictionaryService();
    dictionaryService.init();

    createWindow();

    // Global shortcut: Cmd/Ctrl+Shift+D to show/hide
    globalShortcut.register('CommandOrControl+Shift+D', () => {
        if (mainWindow) {
            if (mainWindow.isVisible()) {
                mainWindow.hide();
            } else {
                mainWindow.show();
                mainWindow.focus();
            }
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    if (dictionaryService) dictionaryService.close();
});

// IPC handlers
ipcMain.handle('search-word', async (event, query: string) => {
    return dictionaryService.search(query);
});

ipcMain.handle('get-word-details', async (event, word: string) => {
    return dictionaryService.getDetails(word);
});