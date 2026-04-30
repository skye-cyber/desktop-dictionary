import path from 'path';
import fs from 'fs';


export enum ThemeType {
    dark = 'dark',
    light = 'light'
}

export interface ApiType {

}


declare global {
    interface Window {
        global: Window;
        dict: {
            api: ApiType;
        };
    }
}
