import { app, BrowserWindow, globalShortcut, Tray, Menu, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

const isDev = !app.isPackaged;
let mainWindow: Electron.BrowserWindow | null = null;

let isQuiting: Boolean = false
let iconPath: string

function setAppIcon() {
    iconPath = isDev
        ? path.join(__dirname, '../assets/deskdict.png') // for dev
        : path.join(process.resourcesPath, './assets/deskdict.png'); // for prod;

    // Fallback to a generic icon or skip setting it
    if (!fs.existsSync(iconPath)) {
        console.warn('Icon not found, fallback triggered');
        iconPath = '';
    }
}

setAppIcon()

function createWindow(): BrowserWindow {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 400,
        icon: iconPath,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false, // Disable sandboxing
        },
        titleBarStyle: 'hiddenInset',
        show: false,
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:40099/')
        // Open DevTools in development
        //mainWindow.webContents.openDevTools()
    } else {
        // Load the main application when it is ready
        mainWindow.loadFile(path.join(process.resourcesPath, './build/index.html'))
    }

    // if (isDev) {
    //     mainWindow.webContents.openDevTools();
    // }

    mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });

    // Intercept the window close event
    mainWindow.on('close', (event) => {
        if (!isQuiting && process.platform !== 'darwin') {
            event.preventDefault();   // prevent window from actually closing
            mainWindow?.hide();        // just hide it to tray
        }
        return false;
    });
    return mainWindow
}

/**
 * Set up application menu
 */
function setupMenu() {
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);
}

const setShortcuts=()=>{
    // F12 — Toggle DevTools
    globalShortcut.register('F12', () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.webContents.toggleDevTools();
        }
    });

    // Ctrl+R / Cmd+R — Reload
    globalShortcut.register('CommandOrControl+R', () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.webContents.reload();
        }
    });

    // Ctrl+Shift+R / Cmd+Shift+R — Force reload
    globalShortcut.register('CommandOrControl+Shift+R', () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.webContents.reloadIgnoringCache();
        }
    });
}

// Set the app user model ID
app.setAppUserModelId('com.deskdict.app');

app.on('ready', async () => {
    // setupIPC()
    await CreateBaseDir()

    setShortcuts()
    // Create and set the menu
    setupMenu()

    ipcMain.handle('app:isPackaged', () => app.isPackaged)

    // Create the main window
    const mainWindow = createWindow();

    // Create the tray icon
    const tray = new Tray(iconPath); // Path to your tray icon
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: () => {
                const windows = BrowserWindow.getAllWindows();
                if (windows.length === 0) {
                    createWindow();
                } else {
                    windows[0].show();
                }
            }
        },
        {
            label: 'New window',
            click: () => {
                createWindow()
            }
        },
        {
            label: 'Quit',
            click: () => {
                isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Dictionary');
    tray.setContextMenu(contextMenu);

    // Restore window on tray double-click
    tray.on('double-click', () => {
        mainWindow.show();
    });
});

app.whenReady().then(() => {
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
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

async function CreateBaseDir() {
    try {
        const baseDir = path.join(app.getPath('home'), '.deskdict');
        fs.mkdirSync(baseDir, { recursive: true });
    } catch (error) {
        console.error('Error creating directories:', error);
    }

}
