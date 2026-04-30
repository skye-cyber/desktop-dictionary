import * as path from 'path';
import * as os from 'os';
// import { app } from 'electron';

const isDev = process.env.NODE_ENV === 'development';

export const BASE_DIR = path.join(os.homedir(), '.deskdict')
export const RESOURCE_DIR = isDev ? path.join(__dirname, "../assets") : process.resourcesPath
export const DICTIONARY_DIR = path.join(RESOURCE_DIR, 'dictionary')
