import * as path from 'path';
import * as os from 'os';

export const BASE_DIR = path.join(os.homedir(), '.deskdict')
export const RESOURCE_DIR = process.resourcesPath
export const DICTIONARY_DIR = path.join(RESOURCE_DIR, 'dictionary')
