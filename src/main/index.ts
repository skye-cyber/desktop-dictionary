import { app, BrowserWindow, ipcMain, globalShortcut, Tray, Menu } from 'electron';
import path from 'path';
import fs from 'fs';
import DictionaryService from './services/dictionaryService';

const isDev = process.env.NODE_ENV === 'development';
let mainWindow: Electron.BrowserWindow | null = null;
let dictionaryService: DictionaryService;

// const isDev = !app.isPackaged;
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
        minWidth: 600,
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
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                { label: 'New', accelerator: 'CmdOrCtrl+N', click: () => console.log('New File') },
                { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => console.log('Open File') },
                { type: 'separator' },
                { label: 'Exit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload', role: "reload", accelerator: 'CmdOrCtrl+R', click: (_, focusedWindow) => {
                        if (focusedWindow && 'reload' in focusedWindow) {
                            const view = (focusedWindow as any).getFocusedWebContentsView?.();
                            view?.webContents?.reload()
                        }
                    }

                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'F12',
                    role: 'toggleDevTools',
                    click: (_, focusedWindow) => {
                        // Type guard for BaseWindow multi-view support
                        if (focusedWindow && 'getWebContentsView' in focusedWindow) {
                            const view = (focusedWindow as any).getFocusedWebContentsView?.();
                            view?.webContents?.toggleDevTools();
                        } else if ('webContents' in (focusedWindow as any)) {
                            (focusedWindow as any).webContents.toggleDevTools();
                        }
                    },
                },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen', accelerator: 'F11' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
                {
                    label: 'Toggle Full Screen',
                    role: 'togglefullscreen',       // built-in behavior
                    accelerator: 'F11'              // explicit on all platforms
                }
            ]
        },

        {
            label: 'Help',
            submenu: [
                { label: 'Learn More', click: () => require('electron').shell.openExternal('https://electronjs.org') },
                {
                    label: 'Documentation',
                    click: () => {
                        const docWindow = new BrowserWindow({
                            width: 800,
                            height: 600,
                            webPreferences: {
                                preload: path.join(__dirname, 'preload.js'),
                                                            nodeIntegration: false,
                                                            contextIsolation: true
                            }
                        });
                        docWindow.loadFile(path.join(__dirname, '../assets/documentation.html'));
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Set the app user model ID
app.setAppUserModelId('com.deskdict.app');

app.on('ready', async () => {
    // setupIPC()

    // Create and set the menu
    setupMenu()

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
            label: 'Help',
            click: () => {
                //show_documentation()
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

    tray.setToolTip('DeskDict');
    tray.setContextMenu(contextMenu);

    // Restore window on tray double-click
    tray.on('double-click', () => {
        mainWindow.show();
    });
});

app.whenReady().then(() => {
    dictionaryService = new DictionaryService();
    // dictionaryService.init();

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
    // if (dictionaryService) dictionaryService.close();
});

// IPC handlers
ipcMain.handle('get-hints', async (_, word: string) => {
    return dictionaryService.hint(word);
});

ipcMain.handle('search-word', async (_, query: string) => {
    return dictionaryService.search(query);
});
