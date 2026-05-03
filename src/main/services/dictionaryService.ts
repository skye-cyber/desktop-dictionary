import fs from 'fs';
import path from 'path';
import { Dictionary, DictionaryEntry } from '../../types/global';
import { DICTIONARY_DIR } from '../shared';


class DictionaryService {
    hint(word: string, isInDev: boolean): string[] {
        if (!word || word.trim().length === 0) return [];
        const query = word.trim().toUpperCase()
        const first_leter = word.toLowerCase().substring(0, 1) // File named after first letter of the word
        const filepath = path.join(DICTIONARY_DIR(isInDev), `${first_leter}.json`)
        if (!fs.statfsSync(filepath)) {
            return []
        }
        const data: string = fs.readFileSync(filepath, { encoding: "utf8" })
        let parsed_data: Dictionary
        try {
            parsed_data = JSON.parse(data)
        } catch (err) {
            return []
        }
        // Filter keys
        const keys = Object.keys(parsed_data)
        const queryLength = query.length

        const hintKeys: string[] = keys.filter(key => (key.length > queryLength && key.startsWith(query)))
        return hintKeys.slice(0, 50) // 50 matches
    }

    search(query: string, isInDev: boolean): DictionaryEntry | undefined {
        if (!query || query.trim().length === 0) return;

        const searchTerm = query.trim().toUpperCase();
        const first_leter = searchTerm.toLowerCase().substring(0, 1) // File named after first letter of the word
        const filepath = path.join(DICTIONARY_DIR(isInDev), `${first_leter}.json`)
        if (!fs.statfsSync(filepath)) {
            return
        }
        const data: string = fs.readFileSync(filepath, { encoding: "utf8" })
        let parsed_data: Dictionary
        try {
            parsed_data = JSON.parse(data)
        } catch (err) {
            console.log(err)
            return
        }
        if (!parsed_data) return
        const keys = Object.keys(parsed_data)
        const matchKey: string = keys.filter(key => key === searchTerm)[0]
        return (parsed_data as any)[matchKey] as DictionaryEntry

    }
}

export const dictionaryService = new DictionaryService()
export default DictionaryService;
