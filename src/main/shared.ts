import * as path from 'path';
import * as os from 'os';

export const BASE_DIR = path.join(os.homedir(), '.deskdict')
export const DEV_RESOURCE_DIR = path.join(__dirname, "../assets")
export const PROD_RESOURCE_DIR = path.join(process.resourcesPath, "./assets")
// export const RESOURCE_DIR = path.join(!window.dict.api.isPackaged() ? __dirname : process.resourcesPath, "../assets")
export const DICTIONARY_DIR = (isDev: boolean) => path.join(isDev ? DEV_RESOURCE_DIR : PROD_RESOURCE_DIR, 'dictionary')
export const BOOKMARK_FILE = path.join(BASE_DIR, 'bookmark.json')
