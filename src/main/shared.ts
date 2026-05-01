import * as path from 'path';
import * as os from 'os';
// import { app } from 'electron';

const isDev = process.env.NODE_ENV === 'development';

export const BASE_DIR = path.join(os.homedir(), '.deskdict')
export const RESOURCE_DIR = path.join(isDev ? __dirname : process.resourcesPath, "../assets")
export const DICTIONARY_DIR = path.join(RESOURCE_DIR, 'dictionary')
export const BOOKMARK_FILE = path.join(BASE_DIR, 'bookmark.json')
